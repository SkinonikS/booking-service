<template>
  <FileUpload custom-upload auto :disabled="props.disabled" mode="basic" accept="image/*" @uploader="upload" />
</template>

<script setup lang="ts">
import type { FileUploadUploaderEvent } from 'primevue/fileupload';

export interface Props {
  url: string;
  disabled?: boolean;
}

export interface Emits {
  uploaded: [File];
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const upload = async (e: FileUploadUploaderEvent) => {

};
</script>
