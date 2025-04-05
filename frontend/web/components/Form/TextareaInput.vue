<template>
  <div :class="['flex flex-col gap-2', props.class]" :style="props.style">
    <label :for="props.name">{{ props.label }}</label>
    <div class="flex flex-col gap-1">
      <Textarea :id="props.name" v-model="value" :invalid="!! errorMessage" :rows="6" :cols="6" :maxlength="props.maxLength" auto-resize :disabled="props.disabled" />
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
  rows?: number;
  maxLength?: number;
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  rows: 6,
  maxLength: undefined,
  class: '',
  style: '',
  modelValue: undefined,
});

const { value, errorMessage } = useField<string>(() => props.name, undefined, {
  syncVModel: true,
});
</script>
