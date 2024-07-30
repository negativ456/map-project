<template>
  <div id="map" ref="mapContainer" style="height: 100%;"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default defineComponent({
  name: "GeographicMap",
  setup() {
    const mapContainer = ref<HTMLDivElement | null>(null);
    const map = ref<L.Map | null>(null);
    const route = useRoute();

    onMounted(() => {
      if (mapContainer.value) {
        map.value = L.map(mapContainer.value).setView([55.751244, 37.618423], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map.value);

        const locations = [
          {
            name: "Location 1",
            coordinates: [55.751244, 37.618423],
          },
          // Добавьте другие локации здесь
        ];

        locations.forEach((location) => {
          const marker = L.marker(location.coordinates).addTo(map.value)
            .on("click", () => {
              const popup = L.popup()
                .setLatLng(location.coordinates)
                .setContent(`<p>${location.name}</p>`)
                .openOn(map.value);
            });
        });

        watch(() => route.params, (newParams) => {
          if (newParams.district) {
            const selectedLocation = locations.find(loc => loc.name === newParams.district);
            if (selectedLocation && map.value) {
              map.value.setView(selectedLocation.coordinates, 10);
            }
          }
        });
      }
    });

    return {
      mapContainer,
    };
  },
});
</script>

<style>
#map {
  height: 100%;
}
</style>
