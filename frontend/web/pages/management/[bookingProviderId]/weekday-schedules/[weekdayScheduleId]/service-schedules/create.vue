<template>
  <PageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.pages.serviceSchedultCreate.title') }}</template>
        <template #subtitle>{{ $t('management.pages.serviceSchedultCreate.description') }}</template>
        <template #content>
          <ManagementFormCreateServiceSchedule ref="formRef" :service-options="serviceOptions" :weekday-schedule-id="($route.params.weekdayScheduleId as string)" :disabled="status === 'pending' || loading" @submit="submitForm"  @reset="handleReset" />
        </template>
        <template #footer>
          <FormControls :disabled="meta.dirty" :loading="status === 'pending' || loading" @submit="formRef?.requestSubmit()" @reset="formRef?.reset()" />
        </template>
      </Card>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import * as yup from 'yup';
import type { Service, WeekdaySchedule } from '~/types/models';

export interface GraphqlResponse {
  weekdaySchedule: Pick<WeekdaySchedule, 'id' | 'openTime' | 'closeTime' | 'isActive'> & {
    bookingProvider: {
      services: Pick<Service, 'id' | 'name'>[];
    };
  };
}

definePageMeta({
  layout: 'management',
  validate: (route) => yup.object({
    bookingProviderId: yup.string().required().uuid(),
    weekdayScheduleId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

const loading = ref(false);

const route = useRoute();
const localeRoute = useLocaleRoute();
const { $graphql } = useNuxtApp();
const formRef = useTemplateRef('formRef');
const toast = useToast();

const { data: weekdaySchedule, status } = await useAsyncData(async () => {
  const { weekdaySchedule } = await $graphql.default.request<GraphqlResponse>(gql`
    query weekdaySchedule($id: ID!) {
      weekdaySchedule(id: $id) {
        openTime
        closeTime
        bookingProvider {
          services {
            id
            name
          }
        }
      }
    }
  `, { id: route.params.weekdayScheduleId.toString() });

  return weekdaySchedule;
});

const serviceOptions = computed(() => {
  if (! weekdaySchedule.value) {
    return [];
  }

  return weekdaySchedule.value?.bookingProvider?.services.map((service) => ({
    value: service.id,
    label: service.name,
  }));
});

const validationSchema = computed(() => toTypedSchema(yup.object({
  isActive: yup.boolean().required().label('Active'),
  maxBookings: yup.number().required().min(1).max(255).label('Max bookings'),
  timeSpan: yup.number().required().min(1).label('Time span'),
  serviceId: yup.string().required().uuid().label('Service'),

  openTime: yup.number().integer().min(0).max(1439).test({
    name: 'not-less-than-close-time',
    test: (value, ctx) => {
      return value === undefined || value < ctx.parent.closeTime;
    },
    message: ({ label }) => `${label} must be earlier than closing time`,
  }).label('Open time').timeBounded(weekdaySchedule.value?.openTime ?? 0, weekdaySchedule.value?.closeTime ?? 0),

  closeTime: yup.number().integer().min(0).max(1439).test({
    name: 'not-grater-than-open-time',
    test: (value, ctx) => {
      return value === undefined || value > ctx.parent.openTime;
    },
    message: ({ label }) => `${label} must be later than opening time`,
  }).label('Close time').timeBounded(weekdaySchedule.value?.openTime ?? 0, weekdaySchedule.value?.closeTime ?? 0),
})));

const { meta, handleReset, handleSubmit } = useForm({
  initialValues: {
    serviceId: undefined,
    isActive: true,
    openTime: 0,
    closeTime: 0,
    maxBookings: 1,
    timeSpan: 1,
  },
  validationSchema,
});

const submitForm = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request(gql`
      mutation createServiceSchedule($weekdayScheduleId: ID!, $serviceId: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!, $maxBookings: Int!, $timeSpan: Int!) {
        createServiceSchedule(input: {
          weekdayScheduleId: $weekdayScheduleId,
          serviceId: $serviceId,
          isActive: $isActive,
          openTime: $openTime,
          closeTime: $closeTime,
          maxBookings: $maxBookings,
          timeSpan: $timeSpan
        }) {
          id
        }
      }
    `, {
      weekdayScheduleId: route.params.weekdayScheduleId.toString(),
      serviceId: values.serviceId,
      isActive: values.isActive,
      openTime: values.openTime,
      closeTime: values.closeTime,
      maxBookings: values.maxBookings,
      timeSpan: values.timeSpan,
    });

    toast.add({ summary: 'Service schedule created successfully', severity: 'success' });

    const localeRoutePath = localeRoute({
      name: 'management-bookingProviderId-weekday-schedules-weekdayScheduleId-edit',
      params: { weekdayScheduleId: route.params.weekdayScheduleId },
    });

    await navigateTo(localeRoutePath ?? '/');
  } catch (e) {
    if (e instanceof Error) {
      toast.add({ summary: e.message, severity: 'error' });
    } else {
      toast.add({ summary: 'An error occurred while creating the service schedule', severity: 'error' });
    }
  } finally {
    loading.value = false;
  }
});
</script>
