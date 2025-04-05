<template>
  <div :class="['flex flex-col gap-2', props.class]" :style="props.style">
    <label :for="props.name">{{ props.label }}</label>
    <div class="flex flex-col gap-2">
      <Select :id="props.name" v-model="value" :invalid="!! errorMessage" :options="options" option-value="value" option-label="label" option-disabled="disabled" :loading="props.loading" :disabled="props.disabled" />
      <Message v-if="errorMessage" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Option {
  value: unknown;
  label: string;
  disabled?: boolean;
}

export interface Props {
  class?: string;
  style?: string;
  label: string;
  name: string;
  options?: Option[];
  disabled?: boolean;
  loading?: boolean;
  modelValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
  options: () => [],
  disabled: false,
  loading: false,
  modelValue: undefined,
});

const { value, errorMessage } = useField<string>(() => props.name, undefined, {
  syncVModel: true,
});
</script>
