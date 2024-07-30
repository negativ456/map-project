<script setup lang="ts">
import type { SidebarItem } from '@/types/types'
import { onDeactivated, onMounted, ref } from 'vue'
import ArrowIcon from '../assets/arrow.svg'

interface AccordionItemProps {
  item: SidebarItem;
  collapsed: boolean;
}
defineProps<AccordionItemProps>()

const open = ref(false);
const accordionItem = ref<HTMLDivElement | null>(null)

const toggleOpen = (e: MouseEvent) => {
  open.value = !open.value;
}

const closeOnOutsideClick = (e: MouseEvent) => {
  if (accordionItem.value && !e.composedPath().includes(accordionItem.value)) {
    open.value = false;
  }
}

onMounted(() => {
  document.body.addEventListener("click", closeOnOutsideClick)
})

onDeactivated(() => {
  document.body.removeEventListener("click", closeOnOutsideClick)
})
</script>

<template>
  <div v-if="'items' in item" :class="['accordion-item', {'accordion-item--active': open}, {'collapsed': collapsed}]">
    <template v-if="collapsed">
      <div ref="accordionItem" class="accordion-item__title accordion-item__title--collapsed" @click="toggleOpen">
        <img :src="item.icon" width="24" height="24" alt="icon">
        <div v-if="open" class="accordion-item__content--collapsed">
          <router-link v-for="subItem in item.items" :to="subItem.path" :key="subItem.title" class="accordion-item__content__link">{{ subItem.title }}</router-link>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="accordion-item__title" @click="toggleOpen">
        <div class="align-mid">
          <img :src="item.icon" width="24" height="24" alt="icon">
          <p>{{ item.name }}</p>
        </div>
        <img :src="ArrowIcon" class="arrow-down" alt="arrow">
      </div>
      <div class="accordion-item__content">
        <router-link v-for="subItem in item.items" :to="subItem.path" :key="subItem.title" class="accordion-item__content__link">{{ subItem.title }}</router-link>
      </div>
    </template>
  </div>
  <router-link v-else :to="item.path" class="sidebar-link">
    <img :src="item.icon" width="24" height="24" alt="icon">
    <span>{{ item.name }}</span>
  </router-link>
</template>

<style scoped lang="scss">
.accordion-item {

  cursor: pointer;



  &__content {
    display: flex;
    flex-direction: column;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s;

    &__link {
      padding: 14px;
      width: 100%;
      &:hover {
        background: linear-gradient(90deg, #1b3357 0%, #416384 100%);
      }
    }

    &--collapsed {
      position: absolute;
      left: calc(100% + 10px);
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: start;
      background: #142541;
    }
  }
  &--active {
    .accordion-item__content {
      max-height: 200px;
    }

    .arrow-down {
      transform: rotate(180deg);
    }
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px;
    position: relative;

    &:hover {
      background: linear-gradient(90deg, #1b3357 0%, #416384 100%);
    }

    &--collapsed {
      justify-content: center;
    }

    div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}

.arrow-down {
  transition: transform 0.3s;
  color: #7fc241;
}

.sidebar-link {
  display: flex;
  gap: 10px;
  padding: 14px;
  &:hover {
    background: linear-gradient(90deg, #1b3357 0%, #416384 100%);
  }

}

.collapsed {
  .accordion-item__title {
    p {
      display: none;
    }

    .arrow-down {
      display: none;
    }
  }
  .sidebar-link {
    justify-content: center;
    span {
      display: none;
    }
  }
}
</style>