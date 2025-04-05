<template>
  <PageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.pages.servicesCreate.title') }}</template>
        <template #subtitle>{{ $t('management.pages.servicesCreate.description') }}</template>
        <template #content>
          <ManagementFormCreateService ref="formRef" :disabled="loading" @submit="submitForm" @reset="handleReset" />
        </template>
        <template #footer>
          <FormControls :loading="loading" :disabled="meta.dirty" @reset="formRef?.reset()" @submit="formRef?.requestSubmit()" />
        </template>
      </Card>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import * as yup from 'yup';
import BookingProviderId from '~/pages/booking-providers/[bookingProviderId].vue';

definePageMeta({
  layout: 'management',
  validate: (route) => yup.object({
    bookingProviderId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

const loading = ref(false);

const route = useRoute();
const localeRoute = useLocalePath();
const { handleReset, handleSubmit, meta } = useForm();
const { $graphql } = useNuxtApp();
const toast = useToast();
const formRef = useTemplateRef('formRef');

const submitForm = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request(gql`
      mutation createService($bookingProviderId: ID!, $name: String!, $description: String!) {
        createService(input: { name: $name, description: $description, bookingProviderId: $bookingProviderId }) {
          id
        }
      }
    `, {
      bookingProviderId: route.params.bookingProviderId.toString(),
      name: values.name,
      description: values.description,
    });

    toast.add({ summary: 'Service created successfully', severity: 'success' });

    const localeRoutePath = localeRoute({
      name: 'management-bookingProviderId-services',
    });

    await navigateTo(localeRoutePath);
  } catch (e) {
    if (e instanceof Error) {
      toast.add({ summary: e.message, severity: 'error' });
    } else {
      toast.add({ summary: 'An error occurred', severity: 'error' });
    }
  } finally {
    loading.value = false;
  }
});
</script>
