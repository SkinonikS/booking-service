<template>
  <NuxtLinkLocale v-wave active-class="bg-primary/10" :to="props.to" class="flex select-none items-center gap-4 cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors">
    <Icon :name="props.icon" size="1.5rem" />
    <span class="font-medium">{{ props.title }}</span>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
import type { RouteLocationNamedI18n, RouteLocationResolvedI18n } from 'vue-router';

export interface Props {
  icon: string;
  title: string;
  to: RouteLocationNamedI18n | RouteLocationResolvedI18n;
}

const props = defineProps<Props>();
</script>
