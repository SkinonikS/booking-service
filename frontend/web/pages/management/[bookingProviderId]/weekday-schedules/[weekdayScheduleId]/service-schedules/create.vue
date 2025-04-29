<template>
  <BasePageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.pages.serviceScheduleCreate.title') }}</template>
        <template #subtitle>{{ $t('management.pages.serviceScheduleCreate.description') }}</template>
        <template #content>
          <ServiceScheduleCreateForm ref="formRef" :services="services" :disabled="status === 'pending' || loading" @submit="createServiceSchedule" />
        </template>
        <template #footer>
          <BaseFormControls :disabled="meta.dirty" :loading="status === 'pending' || loading" @reset="handleReset()" @submit="formRef?.requestSubmit()" />
        </template>
      </Card>
    </div>
  </BasePageContainer>
</template>

<script setup lang="ts">
import _ from 'lodash';
import * as yup from 'yup';
import { CREATE_SERVICE_SCHEDULE, GET_WEEKDAY_SCHEDULE } from '~/graphql/management/weekday-schedules/service-schedules/create-page';
import { graphql } from '~/utils/graphql';

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

const { data, status } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_WEEKDAY_SCHEDULE), {
    id: route.params.weekdayScheduleId.toString(),
  });
});

useSeoMeta({
  title: 'Create service schedule',
});

const services = computed(() => {
  if (! data.value) {
    return [];
  }

  return _.map(data.value?.weekdaySchedule?.bookingProvider?.services, (service) => ({
    value: service.id,
    label: service.name,
  }));
});

const validationSchema = computed(() => toTypedSchema(yup.object({
  isActive: yup.boolean().required().label('Active'),
  maxBookings: yup.number().required().min(1).max(255).label('Max bookings'),
  timeSpan: yup.number().required().min(1).label('Time span'),
  serviceId: yup.string().required().uuid().label('Service'),
  openTime: yup.number().integer().required().min(0).max(1439).test({
    name: 'not-less-than-close-time',
    test: (value, ctx) => {
      return value === undefined || value < ctx.parent.closeTime;
    },
    message: ({ label }) => `${label} must be earlier than closing time`,
  }).label('Open time').timeBounded(data.value?.weekdaySchedule?.openTime ?? 0, data.value?.weekdaySchedule?.closeTime ?? 0),
  closeTime: yup.number().integer().required().min(0).max(1439).test({
    name: 'not-grater-than-open-time',
    test: (value, ctx) => {
      return value === undefined || value > ctx.parent.openTime;
    },
    message: ({ label }) => `${label} must be later than opening time`,
  }).label('Close time').timeBounded(data.value?.weekdaySchedule?.openTime ?? 0, data.value?.weekdaySchedule?.closeTime ?? 0),
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

const createServiceSchedule = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request(graphql(/* GraphQL */ CREATE_SERVICE_SCHEDULE), {
      weekdayScheduleId: route.params.weekdayScheduleId.toString(),
      serviceId: values.serviceId,
      isActive: values.isActive,
      openTime: values.openTime,
      closeTime: values.closeTime,
      maxBookings: values.maxBookings,
      timeSpan: values.timeSpan,
    });

    toast.add({ summary: 'Service schedule created successfully', severity: 'success' });

    await redirectBack();
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

const redirectBack = async () => {
  const localeRoutePath = localeRoute({
    name: 'management-bookingProviderId-weekday-schedules-weekdayScheduleId-edit',
    params: {
      bookingProviderId: route.params.bookingProviderId,
      weekdayScheduleId: route.params.weekdayScheduleId,
    },
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
