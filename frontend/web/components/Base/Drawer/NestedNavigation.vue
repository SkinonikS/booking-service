<template>
  <div class="overflow-y-auto">
    <ul>
      <li>
        <div
          v-wave
          v-styleclass="{
            selector: '@next',
            enterFromClass: 'hidden',
            enterActiveClass: 'animate-slidedown',
            leaveToClass: 'hidden',
            leaveActiveClass: 'animate-slideup'
          }"
          class="p-4 gap-4 flex items-center text-surface-500 dark:text-surface-400 cursor-pointer rounded"
        >
          <Icon :name="props.icon" size="1.5rem" />
          <span class="font-medium flex-grow">{{ props.label }}</span>
          <Icon name="mdi:chevron-down" size="1.5rem" />
        </div>
        <ul class="overflow-hidden hidden">
          <slot name="links" />
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  label: string;
  icon: string;
}

const props = defineProps<Props>();
</script>
