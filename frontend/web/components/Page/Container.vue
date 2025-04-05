<template>
  <div :class="['container mx-auto px-4 py-8', props.class]" :style="props.style">
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
