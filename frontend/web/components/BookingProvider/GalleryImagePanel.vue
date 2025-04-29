<template>
  <Card>
    <template #title>{{ $t('management.pages.settingsGeneralGalleyImages.title') }}</template>
    <template #subtitle>{{ $t('management.pages.settingsGeneralGalleyImages.description') }}</template>
    <template #content>
      <div v-if="props.images.length < props.maxImages" class="mb-4 flex flex-row-reverse">
        <FileUpload custom-upload auto :disabled="loading" mode="basic" accept="image/*" @uploader="uploadImage" />
      </div>
      <div v-if="images.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <BaseCommonImage
          v-for="image in images"
          :src="image.fullUrl"
          :alt="image.baseName"
          :aspect-ratio="16/9"
          width="100%"
          height="100%"
          object-position="center"
          class="rounded-lg shadow-2xl"
        >
          <template #default>
            <div class="flex flex-row gap-2 p-4">
              <Button v-wave severity="danger" class="shadow-2xl" @click="deleteImage(image.id)">
                <template #icon>
                  <Icon name="mdi:delete" />
                </template>
              </Button>
              <Button v-wave severity="info" class="shadow-2xl" @click="emit('view', image.fullUrl)">
                <template #icon>
                  <Icon name="mdi:eye" />
                </template>
              </Button>
            </div>
          </template>
        </BaseCommonImage>
      </div>
      <div v-else class="flex flex-col items-center justify-center p-4">
        <p>{{ $t('management.settings.media.gallery.noResults.title') }}</p>
        <p>{{ $t('management.settings.media.gallery.noResults.description') }}</p>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import _ from 'lodash';
import type { FileUploadUploaderEvent } from 'primevue/fileupload';
import { DELETE_GALLERY_IMAGE } from '~/graphql/management/settings/general-page';
import { graphql } from '~/utils/graphql';
import type { Media } from '~/utils/graphql/graphql';

export interface Props {
  maxImages: number;
  images?: {
    id: string;
    fullUrl: string;
    baseName: string;
  }[];
}

export interface Emits {
  view: [string];
  deleted: [string];
  uploaded: [Media];
}

const route = useRoute();
const toast = useToast();
const { $graphql } = useNuxtApp();
const { upload, loading } = useFileUpload({
  method: 'POST',
  field: 'image',
  path: `/api/v1/booking-providers/${route.params.bookingProviderId}/gallery-image/upload`,
});

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  images: () => [],
});

const uploadImage = async (e: FileUploadUploaderEvent) => {
  for (const file of _.castArray(e.files)) {
    try {
      const media = await upload<Media>(file);

      toast.add({ summary: 'Gallery image uploaded successfully', severity: 'success' });

      emit('uploaded', media);
    } catch (e) {
      if (e instanceof Error) {
        toast.add({ summary: e.message, severity: 'error' });
      } else {
        toast.add({ summary: 'An unexpected error occurred.', severity: 'error' });
      }
    }
  }
};

const deleteImage = async (imageId: string) => {
  loading.value = true;

  try {
    await $graphql.default.request(graphql(/* GraphQL */ DELETE_GALLERY_IMAGE), {
      id: imageId,
      bookingProviderId: route.params.bookingProviderId.toString(),
    });

    emit('deleted', imageId);

    toast.add({ summary: 'Gallery image deleted successfully', severity: 'success' });
  } catch (e) {
    if (e instanceof Error) {
      toast.add({ summary: e.message, severity: 'error' });
    } else {
      toast.add({ summary: 'An unexpected error occurred.', severity: 'error' });
    }
  } finally {
    loading.value = false;
  }
};
</script>
