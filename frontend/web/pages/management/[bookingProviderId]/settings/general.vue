<template>
  <PageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.pages.settingsGeneral.title') }}</template>
        <template #subtitle>{{ $t('management.pages.settingsGeneral.description') }}</template>
        <template #content>
          <ManagementFormEditBookingProvider ref="formRef" :disabled="status === 'pending' || loading" @reset="handleReset" @submit="submitForm"  />
        </template>
        <template #footer>
          <FormControls :loading="loading" :disabled="meta.dirty || status === 'pending'" @reset="formRef?.reset()" @submit="formRef?.requestSubmit()"/>
        </template>
      </Card>
      <Card>
        <template #title>{{ $t('management.pages.settingsGeneralGalleyImages.title') }}</template>
        <template #subtitle>{{ $t('management.pages.settingsGeneralGalleyImages.description') }}</template>
        <template #content>
          <div v-if="bookingProvider?.galleryImages && bookingProvider.galleryImages.length < 12" class="mb-4 flex flex-row-reverse">
            <ManagementBookingProviderFormImageUpload :url="`/api/v1/booking-providers/${$route.params.bookingProviderId}/gallery-image/upload`" @image-uploaded="galleryImageUploaded" />
          </div>
          <div v-if="bookingProvider?.galleryImages?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <CustomImg
              v-for="(item, index) in bookingProvider?.galleryImages ?? []"
              :key="index"
              :src="item.fullUrl"
              :aspect-ratio="16/9"
              width="100%"
              height="100%"
              object-position="center"
              class="rounded-lg shadow-2xl"
            >
              <template #default>
                <div class="flex flex-row gap-2 p-4">
                  <Button v-wave severity="danger" class="shadow-2xl" @click="deleteGalleryImage(item.id)">
                    <template #icon>
                      <Icon name="mdi:delete" />
                    </template>
                  </Button>
                  <Button v-wave severity="info" class="shadow-2xl" @click="openImage(item.fullUrl)">
                    <template #icon>
                      <Icon name="mdi:eye" />
                    </template>
                  </Button>
                </div>
              </template>
            </CustomImg>
          </div>
          <div v-else class="flex flex-col items-center p-4">
            <p>{{ $t('management.pages.settingsGeneralGalleyImages.noCoverImage') }}</p>
            <p>{{ $t('management.pages.settingsGeneralGalleyImages.clickToUpload') }}</p>
          </div>
        </template>
      </Card>
      <Card>
        <template #title>{{ $t('management.pages.settingsGeneralCoverImage.title') }}</template>
        <template #subtitle>{{ $t('management.pages.settingsGeneralCoverImage.description') }}</template>
        <template #content>
          <div v-if="! bookingProvider?.coverImage" class="mb-4 flex flex-row-reverse">
            <ManagementBookingProviderFormImageUpload :url="`/api/v1/booking-providers/${$route.params.bookingProviderId}/cover-image/upload`" @image-uploaded="coverImageUploaded" />
          </div>
          <div v-if="bookingProvider?.coverImage">
            <CustomImg
              :src="bookingProvider.coverImage.fullUrl"
              :aspect-ratio="9/16"
              height="300px"
              width="200px"
              class="rounded-lg shadow-md"
            >
              <div class="flex flex-row gap-2 p-4">
                <Button v-wave severity="danger" class="shadow-2xl" @click="deleteCoverImage()">
                  <template #icon>
                    <Icon name="mdi:delete" />
                  </template>
                </Button>
                <Button v-wave severity="info" class="shadow-2xl" @click="openImage(bookingProvider.coverImage.fullUrl)">
                  <template #icon>
                    <Icon name="mdi:eye" />
                  </template>
                </Button>
              </div>
            </CustomImg>
          </div>
          <div v-else class="flex flex-col items-center justify-center p-4">
            <p>{{ $t('management.pages.settingsGeneralCoverImage.noCoverImage') }}</p>
            <p>{{ $t('management.pages.settingsGeneralCoverImage.clickToUpload') }}</p>
          </div>
        </template>
      </Card>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import * as yup from 'yup';
import type { BookingProvider, Media } from '~/types/models';

export interface GraphqlResponse {
  bookingProvider: BookingProvider & {
    coverImage: Pick<Media, 'id' | 'fullUrl'> | null;
    galleryImages: Pick<Media, 'id' | 'fullUrl'>[];
  };
}

definePageMeta({
  layout: 'management',
  validate: (route) => yup.object({
    bookingProviderId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

const loading = ref(false);
const { $graphql } = useNuxtApp();
const route = useRoute();
const formRef = useTemplateRef('formRef');
const toast = useToast();

const { data: bookingProvider, status } = await useAsyncData(async () => {
  const { bookingProvider } = await $graphql.default.request<GraphqlResponse>(gql`
    query bookingProvider($id: ID!) {
      bookingProvider(id: $id) {
        id
        name
        email
        phone
        website
        address
        aboutUs
        isActive
        coverImage {
          id
          fullUrl
          baseName
        }
        galleryImages {
          id
          fullUrl
          baseName
        }
      }
    }
  `, { id: route.params.bookingProviderId.toString() });

  return bookingProvider;
});

if (! bookingProvider.value) {
  throw createError({ statusCode: 404, statusMessage: 'Booking provider not found' });
}

const validationSchema = yup.object({
  name: yup.string().required().min(3).max(255).label('Booking provider name'),
  email: yup.string().email().required().label('Email address'),
  phone: yup.string().required().label('Phone number'),
  website: yup.string().nullable().url().label('Website URL'),
  address: yup.string().required().label('Address'),
  aboutUs: yup.string().required().min(32).max(1000).label('About Us'),
  isActive: yup.boolean().required().label('Is Active'),
});

const { meta, handleReset, handleSubmit } = useForm({
  initialValues: {
    name: bookingProvider.value.name,
    email: bookingProvider.value.email,
    phone: bookingProvider.value.phone,
    website: bookingProvider.value.website,
    address: bookingProvider.value.address,
    aboutUs: bookingProvider.value.aboutUs,
    isActive: bookingProvider.value.isActive,
  },
  validationSchema,
});

const submitForm = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request(gql`
      mutation updateBookingProvider($id: ID!, $name: String!, $email: String!, $phone: String!, $website: String, $address: String!, $aboutUs: String!, $isActive: Boolean!) {
        updateBookingProvider(id: $id, input: {
          name: $name,
          email: $email,
          phone: $phone,
          website: $website,
          address: $address,
          aboutUs: $aboutUs,
          isActive: $isActive
        }) {
          id
          name
          email
          phone
          website
          address
          aboutUs
          isActive
        }
      }
    `, {
      id: route.params.bookingProviderId.toString(),
      name: values.name,
      email: values.email,
      phone: values.phone,
      website: values.website,
      address: values.address,
      aboutUs: values.aboutUs,
      isActive: values.isActive,
    });

    loading.value = false;

    toast.add({ summary: 'Booking provider updated successfully', severity: 'success' });
  } catch (e) {
    if (e instanceof Error) {
      toast.add({ summary: e.message, severity: 'error' });
    } else {
      toast.add({ summary: 'An unexpected error occurred.', severity: 'error' });
    }
  } finally {
    loading.value = false;
  }
});

const openImage = (imageUrl: string) => {
  window.open(imageUrl, '_blank');
};

const deleteCoverImage = async () => {
  if (! bookingProvider.value || ! bookingProvider.value.coverImage) {
    return;
  }

  try {
    await $graphql.default.request(gql`
    mutation deleteBookingProviderCoverImage($id: ID!, $bookingProviderId: ID!) {
      deleteBookingProviderCoverImage(id: $id, bookingProviderId: $bookingProviderId) {
        id
      }
    }
  `, {
      id: bookingProvider.value.coverImage.id,
      bookingProviderId: bookingProvider.value.id,
    });

    bookingProvider.value.coverImage = null;
    toast.add({ summary: 'Cover image deleted successfully', severity: 'success' });
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

const deleteGalleryImage = async (galleryImageId: string) => {
  if (! bookingProvider.value) {
    return;
  }

  try {
    await $graphql.default.request(gql`
    mutation deleteBookingProviderGalleryImage($id: ID!, $bookingProviderId: ID!) {
      deleteBookingProviderGalleryImage(id: $id, bookingProviderId: $bookingProviderId) {
        id
      }
    }
  `, {
      id: galleryImageId,
      bookingProviderId: bookingProvider.value.id,
    });

    bookingProvider.value.galleryImages = bookingProvider.value.galleryImages.filter((image) => image.id !== galleryImageId);

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

const coverImageUploaded = (e) => {
  if (! bookingProvider.value) {
    return;
  }

  bookingProvider.value.coverImage = {
    id: e.id,
    fullUrl: e.fullUrl,
  };
};

const galleryImageUploaded = (e) => {
  if (! bookingProvider.value || ! bookingProvider.value.galleryImages) {
    return;
  }

  bookingProvider.value?.galleryImages.push({
    id: e.id,
    fullUrl: e.fullUrl,
  });
};
</script>
