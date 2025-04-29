<template>
  <BasePageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.pages.settingsGeneral.title') }}</template>
        <template #subtitle>{{ $t('management.pages.settingsGeneral.description') }}</template>
        <template #content>
          <BookingProviderEditForm ref="formRef" :disabled="status === 'pending' || loading" @reset="handleReset" @submit="updateBookingProvider"  />
        </template>
        <template #footer>
          <BaseFormControls :loading="loading" :disabled="meta.dirty || status === 'pending'" @reset="handleReset()" @submit="formRef?.requestSubmit()"/>
        </template>
      </Card>
      <BookingProviderCoverImagePanel
        :max-images="1"
        :image="data?.bookingProvider?.coverImage ?? undefined"
        @deleted="coverImageDeleted"
        @uploaded="coverImageUploaded"
        @view="viewImage"
      />
      <BookingProviderGalleryImagePanel
        :max-images="12"
        :images="data?.bookingProvider?.galleryImages ?? []"
        @deleted="galleryImageDeleted"
        @uploaded="galleryImageUploaded"
        @view="viewImage"
      />
    </div>
  </BasePageContainer>
</template>

<script setup lang="ts">
import _ from 'lodash';
import * as yup from 'yup';
import { GET_BOOKING_PROVIDER, UPDATE_BOOKING_PROVIDER } from '~/graphql/management/settings/general-page';
import { graphql } from '~/utils/graphql';
import type { Media } from '~/utils/graphql/graphql';

definePageMeta({
  layout: 'management',
  validate: (route) => yup.object({
    bookingProviderId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

useSeoMeta({
  title: 'Edit booking provider',
});

const loading = ref(false);
const { $graphql } = useNuxtApp();
const route = useRoute();
const formRef = useTemplateRef('formRef');
const toast = useToast();

const { data, status } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_BOOKING_PROVIDER), {
    id: route.params.bookingProviderId.toString(),
  });
});

if (! data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Booking provider not found', fatal: true });
}

const { meta, handleReset, handleSubmit } = useForm({
  initialValues: {
    name: data?.value?.bookingProvider?.name,
    email: data?.value?.bookingProvider?.email,
    phone: data?.value?.bookingProvider?.phone,
    website: data?.value?.bookingProvider?.website,
    address: data?.value?.bookingProvider?.address,
    aboutUs: data?.value?.bookingProvider?.aboutUs,
    isActive: data?.value?.bookingProvider?.isActive,
  },
  validationSchema: toTypedSchema(yup.object({
    name: yup.string().required().min(3).max(255).label('Booking provider name'),
    email: yup.string().email().required().label('Email address'),
    phone: yup.string().required().label('Phone number'),
    website: yup.string().nullable().url().label('Website URL'),
    address: yup.string().required().label('Address'),
    aboutUs: yup.string().required().min(32).max(1000).label('About Us'),
    isActive: yup.boolean().required().label('Is Active'),
  })),
});

const updateBookingProvider = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request(graphql(/* GraphQL */ UPDATE_BOOKING_PROVIDER), {
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

const viewImage = (imageUrl: string) => {
  window.open(imageUrl, '_blank');
};

const coverImageDeleted = async () => {
  if (! data.value || ! data.value.bookingProvider) {
    return;
  }

  data.value.bookingProvider.coverImage = null;
};

const galleryImageDeleted = (imageId: string): void => {
  if (! data.value || ! data.value.bookingProvider) {
    return;
  }

  if (! data.value.bookingProvider?.galleryImages) {
    data.value.bookingProvider.galleryImages = [];
  }

  data.value.bookingProvider.galleryImages = _.filter(data.value.bookingProvider.galleryImages, (image) => {
    if (! image) {
      return false;
    }

    return image.id !== imageId;
  });
};

const coverImageUploaded = (file: Media) => {
  if (! data.value || ! data.value.bookingProvider) {
    return;
  }

  data.value.bookingProvider.coverImage = {
    id: file.id,
    fullUrl: file.fullUrl,
    baseName: file.baseName,
  };
};

const galleryImageUploaded = (file: Media) => {
  if (! data.value || ! data.value.bookingProvider) {
    return;
  }

  if (! data.value.bookingProvider.galleryImages) {
    data.value.bookingProvider.galleryImages = [];
  }

  data.value.bookingProvider.galleryImages.push({
    id: file.id,
    fullUrl: file.fullUrl,
    baseName: file.baseName,
  });
};
</script>
