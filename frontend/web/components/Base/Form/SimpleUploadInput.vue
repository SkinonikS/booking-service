<template>
  <div :class="['flex flex-col gap-2', props.class]" :style="props.style">
    <FileUpload :disabled="props.disabled" mode="basic" :auto="props.auto" :multiple="props.multiple" :file-limit="props.maxFiles" :name="props.name" :accept="props.accept" :custom-upload="true" @uploader="customUpload" @before-upload="onBeforeUpload" @error="onUploadError"/>
    <Message v-if="errorMessage" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
  </div>
</template>

<script setup lang="ts">
import type { FileUploadUploaderEvent } from 'primevue/fileupload';

export interface Props {
  class?: string;
  style?: string;
  label: string;
  name: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxFiles?: number;
  modelValue?: number;
  auto?: boolean;
}

export interface Emits {
  upload: [event: FileUploadUploaderEvent];
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
  accept: '*/*',
  multiple: false,
  maxFiles: undefined,
  modelValue: undefined,
  auto: false,
});

const errorMessage = ref<string>();

const onBeforeUpload = () => {
  errorMessage.value = undefined;
};

const onUploadError = () => {
  errorMessage.value = 'Error while uploading file, please try again.';
};

const customUpload = (e: FileUploadUploaderEvent) => {
  emit('upload', e);
};

defineExpose({
  setErrorMessage: (message: string) => {
    errorMessage.value = message;
  },
});
</script>
