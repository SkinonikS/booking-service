<template>
  <div :class="['flex flex-col gap-2', props.class]" :style="props.style">
    <label :for="props.name">{{ props.label }}</label>
    <div class="flex flex-col gap-2">
      <!-- @vue-expect-error currently does not support date ranges  -->
      <DatePicker :id="props.name" :model-value="jsDate" :disabled="props.disabled" :inline="props.inline" :min-date="props.minDate" :max-date="props.maxDate" :disabled-days="props.disabledWeekdays" :invalid="!! errorMessage" @update:model-value="onModelValue" />
      <Message v-if="errorMessage" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';

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

const { value, errorMessage } = useField<DateTime | null | undefined>(() => props.name, undefined, {
  syncVModel: true,
});

const jsDate = computed(() => {
  if (value.value) {
    return value.value.toJSDate();
  }

  return null;
});

const onModelValue = (date: Date) => {
  if (date) {
    value.value = DateTime.fromJSDate(date);
  } else {
    value.value = null;
  }
};
</script>
