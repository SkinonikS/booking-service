<template>
  <form ref="formRef" class="grid grid-cols-1 gap-4" novalidate @submit="(e) => emit('submit', e)">
    <BaseFormSwitchInput name="isActive" :disabled="props.disabled" :label="$t('common.enabled')" class="col-span-1" />
    <BaseFormTextInput name="name" :disabled="props.disabled" :label="$t('common.name')" class="col-span-1" />
    <BaseFormTextInput name="email" :disabled="props.disabled" :label="$t('common.email')" class="col-span-1" />
    <BaseFormTextInput name="phone" :disabled="props.disabled" :label="$t('common.phone')" class="col-span-1" />
    <BaseFormTextInput name="website" :disabled="props.disabled" :label="$t('common.website')" class="col-span-1" />
    <BaseFormTextInput name="address" :disabled="props.disabled" :label="$t('common.address')" class="col-span-1" />
    <BaseFormTextareaInput name="aboutUs" :disabled="props.disabled" :label="$t('common.aboutUs')" class="col-span-1" />
  </form>
</template>

<script setup lang="ts">
export interface Props {
  disabled?: boolean;
}

export interface Emits {
  submit: [Event];
}

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const formRef = useTemplateRef('formRef');

defineExpose({
  requestSubmit: () => formRef.value?.requestSubmit(),
});
</script>
