<template>
  <aside :class="['hidden w-[var(--sidebar-width)] dark:bg-zinc-900 bg-white border-r dark:border-stone-800 border-stone-300 shadow-[2px_0px_12px_0px_rgba(0,0,0,0.2)] lg:flex lg:flex-col lg:fixed lg:inset-y-0 z-80', props.class]" :style="props.style">
    <ManagementLayoutDrawerContent />
  </aside>
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
