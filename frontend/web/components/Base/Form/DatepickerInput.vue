<template>
  <div :class="['flex flex-col gap-2', props.class]" :style="props.style">
    <label :for="props.name">{{ props.label }}</label>
    <div class="flex flex-col gap-2">
      <DatePicker :id="props.name" v-model="value" :disabled="props.disabled" :inline="props.inline" :min-date="props.minDate" :max-date="props.maxDate" :disabled-days="props.disabledWeekdays" :invalid="!! errorMessage" />
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
  inline?: boolean;
  disabled?: boolean;
  modelValue?: number;
  disabledWeekdays?: number[];
  minDate?: Date;
  maxDate?: Date;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
  inline: false,
  disabled: false,
  modelValue: undefined,
  minDate: undefined,
  maxDate: undefined,
  disabledWeekdays: () => [],
});

const { value, errorMessage } = useField<Date>(() => props.name, undefined, {
  syncVModel: true,
});
</script>
