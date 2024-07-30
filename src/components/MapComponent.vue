<template>
  <div id="map" ref="mapContainer" style="height: 100%;"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import L, { Map, Polygon, Marker, type LatLngTuple } from 'leaflet'
import "leaflet/dist/leaflet.css";
import { districts } from '@/consts/districts'
import type { District } from '@/types/types'
import mapImg from "../assets/map-high.png"
import point from "../assets/map-point.png"
import pointBlue from "../assets/map-point-blue.png"
import mapPointActive from "../assets/map-point-active.png"

defineProps({
  mode: {
    type: String,
    required: true,
  },
})
const mapContainer = ref<HTMLDivElement | null>(null);
const activeDistrict = ref<{district: District; polygon: Polygon} | null>(null)
const locationMarkers: Record<number, Marker> = {};
const imageOverlay = ref<L.ImageOverlay | null>(null);
const osmLayer = ref<L.TileLayer | null>(null);

const createMarkerIcon = (active: boolean) => {
  return L.icon({
    iconUrl: active ? pointBlue : point, // Замените на путь к вашим иконкам
    iconSize: [31, 31],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

onMounted(() => {
  if (mapContainer.value) {
    const map = L.map(mapContainer.value, {
      crs: L.CRS.Simple,
      minZoom: 0,
      maxZoom: 2,
    });

    const bounds = [[0, 0], [1062, 2255]] as LatLngTuple[];


    imageOverlay.value = L.imageOverlay(mapImg, bounds).addTo(map);
    osmLayer.value = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    });
    map.fitBounds(bounds);
    map.setMaxBounds(bounds);
    map.on('drag', function() {
      map.panInsideBounds(bounds, { animate: false });
    });

    districts.forEach(district => {
      const polygon = L.polygon(district.area, { fillOpacity: 0, stroke: false }).addTo(map);
      const center = polygon.getBounds().getCenter();

      const label = L.marker(center, {
        icon: L.divIcon({
          className: 'district-label',
          html: `<div style="pointer-events: none">${district.name}</div>`
        })
      }).addTo(map);

      polygon.on('mouseover', function () {
        if (!activeDistrict.value || activeDistrict.value.district.id !== district.id) {
          polygon.setStyle({ fillColor: '#A2CE01', fillOpacity: 1 });
        }
      });

      polygon.on('mouseout', function () {
        if (!activeDistrict.value || activeDistrict.value.district.id !== district.id) {
          polygon.setStyle({ fillOpacity: 0, stroke: false });
        }
      });

      polygon.on('click', function () {
        if (activeDistrict.value?.district.id === district.id) {
          polygon.setStyle({ fillOpacity: 0, stroke: false });
          map.fitBounds(bounds);
          activeDistrict.value = null;
          label.setOpacity(1);
          district.locations.forEach(location => {
            const marker = locationMarkers[location.id];
            if (marker) {
              marker.setIcon(createMarkerIcon(false));
            }
          });
        } else {
          if (activeDistrict.value) {
            activeDistrict.value.polygon.setStyle({ fillOpacity: 0, stroke: false });
            const active = districts.find(d => d.id === activeDistrict.value?.district.id);
            if (active) {
              active.locations.forEach(location => {
                const marker = locationMarkers[location.id];

                if (marker) {
                  marker.setIcon(createMarkerIcon(false));
                }
              });
            }
          }
          activeDistrict.value = {district, polygon};
          polygon.setStyle({ fillColor: '#A2CE01', fillOpacity: 1 });
          map.setView(center, 1);
          label.setOpacity(0);
          district.locations.forEach(location => {
            const marker = locationMarkers[location.id];
            marker.setIcon(createMarkerIcon(false));
            if (marker) {
              marker.setIcon(createMarkerIcon(true));
            }
          });
        }
      });

      district.locations.forEach(location => {
        const marker = L.marker(location.point, { icon: createMarkerIcon(false) }).addTo(map);
        locationMarkers[location.id] = marker;

        marker.bindPopup(`<div class="custom-popup">
              <h3>${location.name}</h3>
              <p>Количество объектов ${location.objects.length}</p>
            </div>`, {
          closeButton: false,
          offset: L.point(170, 100)
        });

        marker.on("click", () => {
          if (activeDistrict.value?.district.id === district.id) {

            marker.setIcon(L.icon({
              iconUrl: mapPointActive,
              iconSize: [34, 56],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            }));
          }

        });
      });


    });
  }
});
</script>

<style>
#map {
  height: 100%;
}

.leaflet-popup-content-wrapper, .leaflet-popup-tip {
  background: none;
  box-shadow: none;
}

.custom-popup {
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(26px);
  background: rgba(214, 232, 198, 0.65);
  padding: 25px;
  border: 1px solid #B6E800;

  h3 {
    font-weight: 700;
    font-size: 20px;
    line-height: 123%;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #0e1235;
    margin-bottom: 10px;
  }

  p {
    font-size: 20px;
    line-height: 123%;
    letter-spacing: 0.03em;
    color: #0e1235;
    margin: 0;
  }
}

.district-label {
  text-align: center;
  font-size: 24px;
  white-space: nowrap;
  pointer-events: none;
}
</style>
