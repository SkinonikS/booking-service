<template>
  <FileUpload custom-upload auto :disabled="loading" mode="basic" accept="image/*" @uploader="upload" />
</template>

<script setup lang="ts">
import type { FileUploadUploaderEvent } from 'primevue/fileupload';

export interface Props {
  url: string;
}

export interface Emits {
  imageUploaded: [File];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const loading = ref(false);

const { loggedIn, user } = useOidcAuth();
const toast = useToast();

const upload = async (e: FileUploadUploaderEvent) => {
  if (! loggedIn.value) {
    throw new Error('User is not logged in');
  }

  loading.value = true;

  const formData = new FormData();
  for (const file of e.files) {
    formData.append('image', file);
  }

  const runtimeConfig = useRuntimeConfig();

  try {
    const response = await $fetch(props.url, {
      baseURL: runtimeConfig.public.media.baseUrl,
      method: 'POST',
      body: formData,
      credentials: 'omit',
      headers: {
        'Authorization': `Bearer ${user.value?.idToken}`,
        'Accept': 'application/json',
      },
    });

    toast.add({ summary: 'Image uploaded successfully', severity: 'success' });
    emit('imageUploaded', response);
  } catch (error) {
    if (error instanceof Error) {
      toast.add({ summary: error.message, severity: 'error' });
    } else {
      toast.add({ summary: 'Error while uploading file, please try again.', severity: 'error' });
    }
  } finally {
    loading.value = false;
  }
};
</script>
