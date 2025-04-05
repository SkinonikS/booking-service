<template>
  <footer :class="['shadow-[0px_0px_12px_2px_rgba(0,0,0,0.2)] z-1 dark:border-stone-700 border-stone-300 border-t bg-gray-100 dark:bg-zinc-800', props.class]" :style="props.style">
    <div class="container mx-auto px-4 py-6">
      <div class="flex items-center justify-between gap-4 text-center">
        <span>&copy; 2023 BookingService. All rights reserved.</span>
        <LocaleSwitcher />
      </div>
    </div>
  </footer>
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
