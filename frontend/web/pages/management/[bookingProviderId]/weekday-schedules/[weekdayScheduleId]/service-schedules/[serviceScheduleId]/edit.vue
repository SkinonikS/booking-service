<template>
  <PageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.pages.serviceSchedultEdit.title') }}</template>
        <template #subtitle>{{ $t('management.pages.serviceSchedultEdit.description') }}</template>
        <template #content>
          <ManagementFormEditServiceSchedule ref="formRef" :disabled="status === 'pending' || loading" @submit="submitForm"  @reset="handleReset" />
        </template>
        <template #footer>
          <FormControls :disabled="meta.dirty || status === 'pending' || loading" @reset="handleReset" @submit="submitForm">
            <template #before>
              <div class="grow" />
              <Button v-wave text :loading="status === 'pending' || loading" :label="$t('common.delete')" severity="danger" @click="deleteServiceSchedule()">
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
import type { ServiceSchedule } from '~/types/models';

export interface GraphqlResponse {
  serviceSchedule: Pick<ServiceSchedule, 'id' | 'isActive' | 'openTime' | 'closeTime' | 'maxBookings' | 'timeSpan'>;
}

definePageMeta({
  layout: 'management',
  validate: (route) => yup.object({
    serviceScheduleId: yup.string().required().uuid(),
    bookingProviderId: yup.string().required().uuid(),
    weekdayScheduleId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

const loading = ref(false);

const localeRoute = useLocaleRoute();
const { $graphql } = useNuxtApp();
const route = useRoute();
const toast = useToast();

const { data: serviceSchedule, status } = await useAsyncData(async () => {
  const { serviceSchedule } = await $graphql.default.request<GraphqlResponse>(gql`
    query serviceSchedule($id: ID!) {
      serviceSchedule(id: $id) {
        id
        isActive
        openTime
        closeTime
        maxBookings
        timeSpan
      }
    }
  `, { id: route.params.serviceScheduleId.toString() });

  return serviceSchedule;
});

if (! serviceSchedule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service Schedule Not Found' });
}

const { handleReset, handleSubmit, meta } = useForm({
  initialValues: {
    isActive: serviceSchedule.value.isActive,
    openTime: serviceSchedule.value.openTime,
    closeTime: serviceSchedule.value.closeTime,
    maxBookings: serviceSchedule.value.maxBookings,
    timeSpan: serviceSchedule.value.timeSpan,
  },
});

const submitForm = handleSubmit(async (values) => {
  alert(JSON.stringify(values, null, 2));
});

const deleteServiceSchedule = async () => {
  loading.value = true;

  try {
    await $graphql.default.request(gql`
    mutation deleteServiceSchedule($id: ID!) {
      deleteServiceSchedule(id: $id) {
        id
      }
    }
  `, { id: route.params.serviceScheduleId.toString() });

    toast.add({ summary: 'Service schedule deleted successfully', severity: 'success' });

    const localeRoutePath = localeRoute({
      name: 'management-bookingProviderId-weekday-schedules-weekdayScheduleId-edit',
      params: {
        bookingProviderId: route.params.bookingProviderId,
        weekdayScheduleId: route.params.weekdayScheduleId,
      },
    });

    await navigateTo(localeRoutePath ?? '/');
  } catch (e) {
    if (e instanceof Error) {
      toast.add({ summary: e.message, severity: 'error' });
    } else {
      toast.add({ summary: 'An error occurred while deleting the service schedule', severity: 'error' });
    }
  } finally {
    loading.value = false;
  }
};
</script>
