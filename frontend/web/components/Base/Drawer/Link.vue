<template>
  <span v-if="typeof props.to === 'function'" v-wave :class="['flex select-none items-center gap-4 cursor-pointer p-4 rounded hover:bg-surface-100 dark:hover:bg-surface-800 duration-150 transition-colors', props.class]" :style="props.style" @click="() => props.to()">
    <Icon :name="props.icon" size="1.5rem" />
    <span class="font-medium">{{ props.label }}</span>
  </span>
  <NuxtLink v-else v-wave active-class="bg-primary/10" :to="props.to" :class="['flex select-none items-center gap-4 cursor-pointer p-4 rounded hover:bg-surface-100 dark:hover:bg-surface-800 duration-150 transition-colors', props.class]" :style="props.style">
    <div>
      <Icon :name="props.icon" size="1.5rem" />
    </div>
    <span class="font-medium">{{ props.label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { RouteLocationGeneric, RouteLocationRaw } from 'vue-router';

export interface Props {
  class?: string;
  style?: string;
  label: string;
  icon: string;
  to: RouteLocationRaw | RouteLocationGeneric | (() => void);
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
});
</script>
