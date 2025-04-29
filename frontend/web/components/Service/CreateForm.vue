<template>
  <form ref="formRef" class="grid grid-cols-1 gap-4" novalidate @submit="(e) => emit('submit', e)">
    <BaseFormTextInput name="name" :disabled="props.disabled" :label="$t('common.name')" class="col-span-1" />
    <BaseFormTextareaInput name="description" :rows="6" :max-length="200" :disabled="props.disabled" :label="$t('common.description')" class="col-span-1" />
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
