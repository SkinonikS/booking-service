<template>
  <div :class="['relative flex flex-col h-full', props.class]" :style="props.style">
    <div class="overflow-y-auto">
      <ul class="p-4">
        <LayoutManagementDrawerTopNavigation />
      </ul>
    </div>
    <div class="mt-auto">
      <hr class="border-t border-0 border-surface-200 dark:border-surface-700">
      <div class="p-4">
        <LayoutManagementDrawerBottomNavigation />
      </div>
    </div>
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
