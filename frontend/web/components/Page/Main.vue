<template>
  <main :class="['dark:bg-[url(/img/bg-dark.svg)] bg-[url(/img/bg-light.svg)] bg-fixed bg-repeat', props.class]" :style="props.style">
    <slot />
  </main>
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
