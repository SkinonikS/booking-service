<template>
  <BasePageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.services.edit.title') }}</template>
        <template #subtitle>{{ $t('management.services.edit.description') }}</template>
        <template #content>
          <ServiceEditForm ref="formRef" :disabled="status === 'pending'" @submit="updateService" />
        </template>
        <template #footer>
          <BaseFormControls :loading="loading" :disabled="meta.dirty || status === 'pending'" @reset="handleReset()" @submit="formRef?.requestSubmit()">
            <template #before>
              <div class="grow" />
              <Button v-wave text :label="$t('actions.delete')" severity="danger" @click="deleteService()">
                <template #icon>
                  <Icon name="mdi:delete" />
                </template>
              </Button>
            </template>
          </BaseFormControls>
        </template>
      </Card>
    </div>
  </BasePageContainer>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { GET_SERVICE, UPDATE_SERVICE, DELETE_SERVICE } from '~/graphql/management/services/edit-page';
import { graphql } from '~/utils/graphql';

definePageMeta({
  layout: 'management',
  middleware: ['is-verified'],
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

const { data, status } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_SERVICE), {
    serviceId: route.params.serviceId.toString(),
  });
});

if (! data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true });
}

useSeoMeta({
  title: `Edit ${data.value?.service?.name}`,
});

const { handleSubmit, handleReset, meta } = useForm({
  initialValues: {
    name: data.value?.service?.name,
    description: data.value?.service?.description,
  },
  validationSchema: toTypedSchema(yup.object({
    name: yup.string().required().min(3).max(32).label('Name'),
    description: yup.string().nullable().label('Description'),
  })),
});

const updateService = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request(graphql(/* GraphQL */ UPDATE_SERVICE), {
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
    await $graphql.default.request(graphql(/* GraphQL */ DELETE_SERVICE), {
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
