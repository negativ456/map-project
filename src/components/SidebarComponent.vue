<script setup lang="ts">
import logoFull from "../assets/logo-full.png";
import logoShort from "../assets/logo-short.png";
import home from "../assets/home.svg"
import support from "../assets/support.svg"
import health from "../assets/health.svg"
import efficiency from "../assets/efficiency.svg"
import safety from "../assets/safety.svg"
import rosneftFull from "../assets/rosneft-full.svg"
import rosneftShort from "../assets/ronsneft-short.svg"
import type { SidebarAccordion, SidebarItem, SidebarLink } from '@/types/types'
import AccordionItem from '@/components/AccordionItem.vue'
import { ref } from 'vue'

const sidebarItems: Array<SidebarItem> = [
  {
    name: "Комфорт",
    icon: home,
    items: [
      {
        title: "Проживание",
        path: "/"
      },
      {
        title: "Питание",
        path: "/"
      },
      {
        title: "Инфокиоски",
        path: "/"
      },
      {
        title: "Досуг",
        path: "/"
      }
    ]
  },
  {
    name: "Эффективность",
    icon: efficiency,
    items: [
      {
        title: "Проживание",
        path: "/"
      },
      {
        title: "Питание",
        path: "/"
      },
      {
        title: "Инфокиоски",
        path: "/"
      },
      {
        title: "Досуг",
        path: "/"
      }
    ]
  },
  {
    name: "Здоровье",
    icon: health,
    items: [
      {
        title: "Проживание",
        path: "/"
      },
      {
        title: "Питание",
        path: "/"
      },
      {
        title: "Инфокиоски",
        path: "/"
      },
      {
        title: "Досуг",
        path: "/"
      }
    ]
  },
  {
    name: "Безопасность",
    icon: safety,
    items: [
      {
        title: "Проживание",
        path: "/"
      },
      {
        title: "Питание",
        path: "/"
      },
      {
        title: "Инфокиоски",
        path: "/"
      },
      {
        title: "Досуг",
        path: "/"
      }
    ]
  },
  {
    name: "Техподдержка",
    icon: support,
    path: "/"
  }
]
const collapsed = ref(true)
</script>

<template>
  <aside :class="['sidebar', { 'collapsed': collapsed }]">
    <img :src="collapsed ? logoShort : logoFull" alt="" class="logo">
    <button @click="collapsed = !collapsed" class="collapse-button">{{ collapsed ? ">" : "<" }}</button>
    <div class="sidebar__links w100 h100">
      <div class="w100">
        <div v-for="item in sidebarItems" :key="item.name" class="w100">
          <accordion-item :item="item" :collapsed="collapsed"></accordion-item>
        </div>
      </div>

      <img :src="collapsed ? rosneftShort : rosneftFull" alt="">
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  background: #142541;
  width: 220px;
  height: 100%;
  transition: width 0.3s;

  &__links {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
      margin-bottom: 20px;
    }
  }
}

.collapse-button {
  position: absolute;
  background: #ffffff;
  color: #000;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20px;
  right: -10px;
}

.logo {
  margin-bottom: 50px;
  margin-top: 20px;
}

.collapsed {
  width: 60px;
}
</style>