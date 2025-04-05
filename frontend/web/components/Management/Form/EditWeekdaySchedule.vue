<template>
  <form ref="formRef" class="grid grid-cols-1 gap-4" novalidate @submit="(e) => emit('submit', e)" @reset="emit('reset')">
    <FormSwitchInput name="isActive" :disabled="props.loading" :label="$t('common.enabled')" />
    <FormTimeInput name="openTime" :disabled="props.loading" :label="$t('common.openTime')" />
    <FormTimeInput name="closeTime" :disabled="props.loading" :label="$t('common.closeTime')" />
  </form>
</template>

<script setup lang="ts">
export interface Props {
  loading?: boolean;
}

export interface Emits {
  submit: [event: Event];
  reset: [];
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<Emits>();

const formRef = useTemplateRef('formRef');

defineExpose({
  requestSubmit: () => formRef.value?.requestSubmit(),
  reset: () => formRef.value?.reset(),
});
</script>
