<template>
  <div :class="['grid grid-rows-[var(--header-height)_1fr_auto] h-dvh', props.class]" :style="props.style">
    <slot />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  class?: string;
  style?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
});
</script>
