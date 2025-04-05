<template>
  <PageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.pages.servicesEdit.title') }}</template>
        <template #subtitle>{{ $t('management.pages.servicesEdit.description') }}</template>
        <template #content>
          <ManagementFormEditService ref="formRef" :disabled="status === 'pending'" @submit="submitForm" @reset="handleReset" />
        </template>
        <template #footer>
          <FormControls :loading="loading" :disabled="meta.dirty || status === 'pending'" @reset="formRef?.reset()" @submit="formRef?.requestSubmit()">
            <template #before>
              <div class="grow" />
              <Button v-wave text :label="$t('common.delete')" severity="danger" @click="deleteService()">
                <template #icon>
                  <Icon name="mdi:delete" />
                </template>
              </Button>
            </template>
          </FormControls>
        </template>
      </Card>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import * as yup from 'yup';
import type { Service } from '~/types/models';

export interface GraphqlResponse {
  service: Service;
}

definePageMeta({
  layout: 'management',
  validate: (route) => yup.object({
    serviceId: yup.string().required().uuid(),
    bookingProviderId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

const loading = ref(false);

const localeRoute = useLocalePath();
const { $graphql } = useNuxtApp();
const route = useRoute();
const formRef = useTemplateRef('formRef');
const toast = useToast();

const { data: service, status } = await useAsyncData(async () => {
  const { service } = await $graphql.default.request<GraphqlResponse>(gql`
    query service($serviceId: ID!) {
      service(id: $serviceId) {
        id
        name
        description
      }
    }
  `, {
    serviceId: route.params.serviceId.toString(),
  });

  return service;
});

if (! service.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found' });
}

const { handleSubmit, handleReset, meta } = useForm({
  initialValues: {
    name: service.value.name,
    description: service.value.description,
  },
  validationSchema: toTypedSchema(yup.object({
    name: yup.string().required().min(3).label('Name'),
    description: yup.string().optional().label('Description'),
  })),
});

const submitForm = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request(gql`
      mutation updateService($id: ID!, $name: String!, $description: String!) {
        updateService(id: $id, input: { name: $name, description: $description }) {
          id
        }
      }
    `, {
      id: route.params.serviceId.toString(),
      name: values.name,
      description: values.description,
    });

    toast.add({ summary: 'Service updated successfully', severity: 'success' });

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

const deleteService = async () => {
  loading.value = true;

  try {
    await $graphql.default.request(gql`
      mutation deleteService($id: ID!) {
        deleteService(id: $id) {
          id
        }
      }
    `, {
      id: route.params.serviceId.toString(),
    });

    toast.add({ summary: 'Service deleted successfully', severity: 'success' });

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
};
</script>
