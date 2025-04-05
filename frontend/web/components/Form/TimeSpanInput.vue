<template>
  <div :class="['flex flex-col gap-2', props.class]" :style="props.style">
    <label :for="props.name">{{ props.label }}</label>
    <div class="flex flex-col gap-2">
      <InputGroup :id="props.name">
        <InputGroupAddon>
          <Icon name="mdi:clock-time-four-outline" />
        </InputGroupAddon>
        <Select v-model="value" :invalid="!! errorMessage" :disabled="props.disabled" :options="minutes" option-label="label" option-value="value" :placeholder="$t('common.minutes')" />
      </InputGroup>
      <Message v-if="errorMessage" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';

export interface Props {
  class?: string;
  style?: string;
  label: string;
  name: string;
  disabled?: boolean;
  modelValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
  disabled: false,
  modelValue: undefined,
});

const { value, errorMessage } = useField<number>(() => props.name, undefined, {
  syncVModel: true,
});

const minutes = _.times(59, (i) => {
  const k = i + 1;

  return {
    label: k < 10 ? `0${k}` : `${k}`,
    value: k,
  };
});
</script>
