<template>
  <div :class="['flex flex-col gap-2', props.class]" :style="props.style">
    <label :for="props.name">{{ props.label }}</label>
    <div class="flex flex-col gap-2">
      <InputNumber :id="props.name" v-model="value" :disabled="props.disabled" :invalid="!! errorMessage" show-buttons button-layout="horizontal" :min="props.min" :max="props.max" />
      <Message v-if="errorMessage" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  class?: string;
  style?: string;
  label: string;
  name: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  modelValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
  disabled: false,
  min: undefined,
  max: undefined,
  modelValue: undefined,
});

const { value, errorMessage } = useField<number>(() => props.name, undefined, {
  syncVModel: true,
});
</script>
