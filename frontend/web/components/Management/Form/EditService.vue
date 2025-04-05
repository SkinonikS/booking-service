<template>
  <form ref="formRef" class="grid grid-cols-1 gap-4" novalidate @submit="(e) => emit('submit', e)" @reset="emit('reset')">
    <FormTextInput name="name" :disabled="props.disabled" :label="$t('common.name')" />
    <FormTextareaInput name="description" :rows="6" :max-length="200" :disabled="props.disabled" :label="$t('common.description')" />
  </form>
</template>

<script setup lang="ts">
export interface Props {
  disabled?: boolean;
}

export interface Emits {
  submit: [event: Event];
  reset: [];
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<Emits>();

const formRef = useTemplateRef('formRef');

defineExpose({
  requestSubmit: () => formRef.value?.requestSubmit(),
  reset: () => formRef.value?.reset(),
});
</script>
