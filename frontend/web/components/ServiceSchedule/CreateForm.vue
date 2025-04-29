<template>
  <form ref="formRef" :class="['grid grid-cols-1 gap-4', props.class]" :style="props.style" novalidate @submit="(e) => emit('submit', e)">
    <BaseFormSwitchInput name="isActive" :disabled="props.disabled" :label="$t('common.enabled')" class="col-span-1" />
    <BaseFormSelectInput name="serviceId" :options="props.services" :disabled="props.disabled" :label="$t('common.service')" class="col-span-1" />
    <BaseFormTimeInput name="openTime" :disabled="props.disabled" :label="$t('common.openTime')" class="col-span-1" />
    <BaseFormTimeInput  name="closeTime" :disabled="props.disabled" :label="$t('common.closeTime')" class="col-span-1" />
    <BaseFormNumberInput name="maxBookings" :disabled="props.disabled" :min="1" :max="255" :label="$t('common.maxBookings')" class="col-span-1" />
    <BaseFormTimeSpanInput name="timeSpan" :disabled="props.disabled" :label="$t('common.timeSpan')" class="col-span-1" />
  </form>
</template>


<script setup lang="ts">
import _ from 'lodash';

export interface Props {
  class?: string;
  style?: string;
  disabled?: boolean;
  services?: {
    value: string;
    label: string;
  }[];
}

export interface Emits {
  submit: [Event];
}

const formRef = useTemplateRef('formRef');

defineExpose({
  requestSubmit: () => formRef.value?.requestSubmit(),
});

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
  disabled: false,
  services: () => [],
});
</script>
