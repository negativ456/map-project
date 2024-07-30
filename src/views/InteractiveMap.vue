<template>
  <div style="height: 100vh;">
    <MapComponent mode="interactive" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MapComponent from "@/components/MapComponent.vue";

export default defineComponent({
  name: "InteractiveMap",
  components: {
    MapComponent,
  },
});
</script>
