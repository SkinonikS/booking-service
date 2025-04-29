<template>
  <form ref="formRef" class="grid grid-cols-1 gap-4" novalidate @submit="(e) => emit('submit', e)">
    <BaseFormSwitchInput name="isActive" :disabled="props.disabled" :label="$t('labels.enabled')" class="col-span-1" />
    <BaseFormTimeInput name="openTime" :disabled="props.disabled" :label="$t('labels.openTime')" class="col-span-1" />
    <BaseFormTimeInput name="closeTime" :disabled="props.disabled" :label="$t('labels.closeTime')" class="col-span-1" />
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
