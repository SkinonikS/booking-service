<template>
  <a
    v-wave
    v-styleclass="{
      selector: '@next',
      enterFromClass: 'hidden',
      enterActiveClass: 'animate-slidedown',
      leaveToClass: 'hidden',
      leaveActiveClass: 'animate-slideup'
    }"
    :class="[
      'flex items-center gap-4 cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors',
      props.rootActive ? 'bg-primary/10' : ''
    ]"
  >
    <Icon :name="props.icon" size="1.5rem" />
    <span class="font-medium">{{ props.title }}</span>
    <div class="grow" />
    <Icon name="mdi:chevron-down" size="1.5rem" />
  </a>
  <ul
    :class="[
      'overflow-y-hidden transition-all duration-[400ms] ease-in-out',
      ! rootCollapsed ? 'hidden' : '',
      props.listPadding ? 'pl-4' : ''
    ]">
    <slot name="sublinks" :links="props.links">
      <li v-for="link in props.links">
        <CommonDrawerLink :icon="link.icon" :title="link.title" :to="link.to" />
      </li>
    </slot>
  </ul>
</template>

<script setup lang="ts">
import type { RouteLocationNamedI18n, RouteLocationResolvedI18n } from 'vue-router';

export interface Props {
  icon: string;
  title: string;
  rootActive?: boolean;
  listPadding?: boolean;
  links: {
    icon: string;
    title: string;
    to: RouteLocationNamedI18n | RouteLocationResolvedI18n;
  }[];
}

const props = withDefaults(defineProps<Props>(), {
  rootActive: false,
  listPadding: true,
});

const rootCollapsed = ref(false);

onMounted(() => {
  rootCollapsed.value = props.rootActive;
});
</script>
