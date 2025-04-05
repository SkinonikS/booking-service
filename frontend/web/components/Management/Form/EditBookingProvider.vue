<template>
  <form ref="formRef" class="grid grid-cols-1 gap-4" novalidate @submit="(e) => emit('submit', e)" @reset="emit('reset')">
    <FormSwitchInput name="isActive" :disabled="props.loading" :label="$t('common.enabled')" />
    <FormTextInput name="name" :disabled="props.loading" :label="$t('common.name')" />
    <FormTextInput name="email" :disabled="props.loading" :label="$t('common.email')" />
    <FormTextInput name="phone" :disabled="props.loading" :label="$t('common.phone')" />
    <FormTextInput name="website" :disabled="props.loading" :label="$t('common.website')" />
    <FormTextInput name="address" :disabled="props.loading" :label="$t('common.address')" />
    <FormTextareaInput name="aboutUs" :disabled="props.loading" :label="$t('common.aboutUs')" />
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
