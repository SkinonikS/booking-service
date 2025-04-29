<template>
  <BasePageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.pages.servicesCreate.title') }}</template>
        <template #subtitle>{{ $t('management.pages.servicesCreate.description') }}</template>
        <template #content>
          <ServiceCreateForm ref="formRef" :disabled="loading" @submit="submitForm" />
        </template>
        <template #footer>
          <BaseFormControls :loading="loading" :disabled="meta.dirty" @reset="handleReset()" @submit="formRef?.requestSubmit()" />
        </template>
      </Card>
    </div>
  </BasePageContainer>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { CREATE_SERVICE } from '~/graphql/management/services/create-page';
import { graphql } from '~/utils/graphql';

definePageMeta({
  layout: 'management',
  validate: (route) => yup.object({
    bookingProviderId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

useSeoMeta({
  title: 'Create service',
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
    await $graphql.default.request(graphql(/* GraphQL */ CREATE_SERVICE), {
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
