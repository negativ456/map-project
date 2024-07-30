<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
</script>

<template>
  <app-layout>
    <template #sidebar>
      <sidebar-component></sidebar-component>
    </template>
    <template #content>
      <router-view></router-view>
    </template>
  </app-layout>
</template>

<style scoped>

</style>
