<template>
  <Card :class="['hover:shadow-lg transition-shadow cursor-pointer', props.class]" :style="props.style" @click="emit('click')">
    <template #content>
      <div class="flex flex-col items-center justify-center">
        <Icon name="mdi:shape-plus" size="3rem" class="text-primary" />
        <h3 class="font-semibold text-lg">{{ props.label }}</h3>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
export interface Props {
  label: string;
  class?: string;
  style?: string;
}

export interface Emits {
  click: [];
}

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
});
</script>
