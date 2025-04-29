<template>
  <Card>
    <template #title>{{ $t('public.bookingProvider.booking.title') }}</template>
    <template #subtitle>{{ $t('public.bookingProvider.booking.description') }}</template>
    <template #content>
      <form ref="formRef" class="flex flex-col gap-4" @submit="submitForm">
        <BaseFormSelectInput name="serviceId" :label="$t('labels.service')" :options="props.services" />
        <BaseFormDatepickerInput name="date" :label="$t('labels.date')" :disabled="! values.serviceId" :disabled-weekdays="props.blockedWeekdays" :min-date="new Date()" inline />
        <BaseFormSelectInput name="serviceScheduleId" :label="$t('labels.schedule')" :options="serviceSchedules" :loading="status === 'pending'" :disabled="! values.serviceId" />
        <BaseFormSelectInput name="timeSlot" :label="$t('labels.timeSlot')" :options="timeSlots" :loading="status === 'pending'" :disabled="! values.serviceScheduleId" />
      </form>
    </template>
    <template #footer>
      <Button v-if="loggedIn" v-wave fluid :label="$t('actions.requestBooking')" :loading="loading" :disabled="! meta.valid" @click="formRef?.requestSubmit()">
        <template #icon>
          <Icon name="mdi:calendar-check" />
        </template>
      </Button>
      <Button v-else v-wave fluid :label="$t('actions.login')" :loading="loading" @click="login()">
        <template #icon>
          <Icon name="mdi:login" />
        </template>
      </Button>
    </template>
  </Card>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { DateTime } from 'luxon';
import * as yup from 'yup';
import { GET_DATEPICKER_INFO_FOR_SERVICE, REQUEST_BOOKING } from '~/graphql/booking-provider-page';
import { graphql } from '~/utils/graphql';

export interface Props {
  services?: {
    label: string;
    value: string;
  }[];
  blockedWeekdays?: number[];
}

const props = withDefaults(defineProps<Props>(), {
  services: () => [],
  blockedWeekdays: () => [],
});

const loading = ref(false);

const { loggedIn, login } = useOidcAuth();
const { $graphql } = useNuxtApp();
const toast = useToast();
const formRef = useTemplateRef('formRef');

const { meta, handleSubmit, values, resetField } = useForm({
  initialValues: {
    date: new Date(),
  },
  validationSchema: toTypedSchema(yup.object({
    serviceId: yup.string().required().label('Service'),
    serviceScheduleId: yup.string().required().label('Schedule'),
    date: yup.date().required().label('Date'),
    timeSlot: yup.number().required().label('Time'),
  })),
});

const { data, status } = await useAsyncData(() => {
  if (! values.serviceId || ! values.date) {
    return Promise.resolve(undefined);
  }

  return $graphql.default.request(graphql(/* GraphQL */ GET_DATEPICKER_INFO_FOR_SERVICE), {
    serviceId: values.serviceId,
    date: DateTime.fromJSDate(values.date).toFormat('yyyy-MM-dd'),
  });
}, {
  server: false,
  lazy: true,
  immediate: false,
  watch: [
    () => values.serviceId,
    () => values.date,
  ],
});

watch([() => values.serviceId, () => values.date], () => {
  resetField('serviceScheduleId', { value: undefined, touched: true });
  resetField('timeSlot', { value: undefined, touched: true });
});

const serviceSchedules = computed(() => {
  if (! data.value) {
    return [];
  }

  return _.map(data.value?.serviceDatepicker, (serviceDatepicker) => ({
    label: getFormattedTimeRange(serviceDatepicker.serviceSchedule.openTime, serviceDatepicker.serviceSchedule.closeTime),
    value: serviceDatepicker.serviceSchedule.id,
  }));
});

const timeSlots = computed(() => {
  if (! values.serviceScheduleId) {
    return [];
  }

  const timeInfo = _.find(data?.value?.serviceDatepicker, (serviceDatepicker) => {
    return serviceDatepicker.serviceSchedule.id === values.serviceScheduleId;
  });

  if (! timeInfo) {
    return [];
  }

  let i = 0;
  const timeSlots: {
    label: string;
    value: number;
    disabled?: boolean;
  }[] = [];

  while (timeInfo.serviceSchedule.openTime + (i * timeInfo.serviceSchedule.timeSpan) < timeInfo.serviceSchedule.closeTime) {
    const timeSlot = timeInfo.serviceSchedule.openTime + (i * timeInfo.serviceSchedule.timeSpan);
    const bookedTimeSlot = _.find(timeInfo.bookedTimeSlots, (bookedTimeSlot) => bookedTimeSlot.timeSlot === timeSlot);

    const currentBookings = bookedTimeSlot && bookedTimeSlot.currentBookings
      ? bookedTimeSlot.currentBookings
      : 0;

    const endTime = Math.min(timeSlot + timeInfo.serviceSchedule.timeSpan, timeInfo.serviceSchedule.closeTime);

    timeSlots.push({
      label: `${convertMinutesForHumans(timeSlot)} - ${convertMinutesForHumans(endTime)}`,
      value: timeSlot,
      disabled: currentBookings >= timeInfo.serviceSchedule.maxBookings,
    });

    i++;
  }

  return timeSlots;
});

const submitForm = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request(graphql(/* GraphQL */ REQUEST_BOOKING), {
      serviceScheduleId: values.serviceScheduleId,
      date: DateTime.fromJSDate(values.date).toFormat('yyyy-MM-dd'),
      timeSlot: values.timeSlot,
    });

    toast.add({ summary: 'Booking created successfully', severity: 'success' });
  } catch (e) {
    if (e instanceof Error) {
      toast.add({ summary: e.message, severity: 'error' });
    } else {
      toast.add({ summary: 'An error occurred while creating the booking', severity: 'error' });
    }
  } finally {
    loading.value = false;
  }
});
</script>

