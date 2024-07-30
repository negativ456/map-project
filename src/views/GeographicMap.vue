<template>
  <div style="height: 100vh;">
    <GeographicMap />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GeographicMap from "@/components/GeographicMap.vue";

export default defineComponent({
  name: "GeographicMap",
  components: {
    GeographicMap,
  },
});
</script>
