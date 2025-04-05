<template>
  <form ref="formRef" :class="['grid grid-cols-1 gap-4', props.class]" :style="props.style" novalidate @submit="(e) => emit('submit', e)" @reset="emit('reset')">
    <FormSwitchInput name="isActive" :disabled="props.disabled" :label="$t('common.enabled')" />
    <FormSelectInput name="serviceId" :options="props.serviceOptions" :disabled="props.disabled" :label="$t('common.service')" />
    <FormTimeInput name="openTime" :disabled="props.disabled" :label="$t('common.openTime')" />
    <FormTimeInput  name="closeTime" :disabled="props.disabled" :label="$t('common.closeTime')" />
    <FormNumberInput name="maxBookings" :disabled="props.disabled" :min="1" :max="255" :label="$t('common.maxBookings')" />
    <FormTimeSpanInput name="timeSpan" :disabled="props.disabled" :label="$t('common.timeSpan')" />
  </form>
</template>


<script setup lang="ts">
import _ from 'lodash';

export interface Props {
  class?: string;
  style?: string;
  disabled?: boolean;
  serviceOptions: {
    value: string;
    label: string;
  }[];
}

export interface Emits {
  submit: [event: Event];
  reset: [];
}

defineExpose({
  requestSubmit: () => formRef.value?.requestSubmit(),
  reset: () => formRef.value?.reset(),
});

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
  disabled: false,
});

const emit = defineEmits<Emits>();

const formRef = useTemplateRef('formRef');

// const serviceOptions = computed(() => {
//   return _.map(store.weekdaySchedule?.bookingProvider?.services ?? [], (service) => ({
//     value: service.id,
//     label: service.name,
//   }));
// });
</script>
