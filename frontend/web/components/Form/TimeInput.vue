<template>
  <div :class="['flex flex-col gap-2', props.class]" :style="props.style">
    <label :for="props.name">{{ props.label }}</label>
    <div class="flex flex-col gap-2">
      <InputGroup :id="props.name">
        <InputGroupAddon>
          <Icon name="mdi:clock-time-four-outline" />
        </InputGroupAddon>
        <Select v-model="selectedHour" :disabled="props.disabled" :invalid="!! errorMessage" :options="hours" option-label="label" option-value="value" :placeholder="$t('common.hours')" />
        <Select v-model="selectedMinute" :disabled="props.disabled" :invalid="!! errorMessage" :options="minutes" option-label="label" option-value="value" :placeholder="$t('common.minutes')" />
      </InputGroup>
      <Message v-if="errorMessage" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import * as yup from 'yup';

export interface Props {
  class?: string;
  style?: string;
  label: string;
  name: string;
  disabled?: boolean;
  modelValue?: number;
  min?: number;
  max?: number;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
  disabled: false,
  modelValue: undefined,
  min: undefined,
  max: undefined,
});

const selectedHour = ref<number>(0);
const selectedMinute = ref<number>(0);

const { value, errorMessage } = useField<number>(() => props.name, undefined, {
  syncVModel: true,
});

watch([selectedHour, selectedMinute], ([newSelectedHour, newSelectedMinute]) => {
  value.value = newSelectedHour * 60 + newSelectedMinute;
});

watch(value, (newValue) => {
  selectedHour.value = Math.floor(newValue / 60);
  selectedMinute.value = newValue % 60;
}, { immediate: true });

const hours = _.times(24, (i) => ({
  label: i < 10 ? `0${i}` : `${i}`,
  value: i,
}));

const minutes = _.times(60, (i) => ({
  label: i < 10 ? `0${i}` : `${i}`,
  value: i,
}));
</script>
