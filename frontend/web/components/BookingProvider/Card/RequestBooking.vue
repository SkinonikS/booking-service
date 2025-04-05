<template>
  <Card>
    <template #title>{{ $t('pages.bookingProvidersShow.requestBookingTitle') }}</template>
    <template #subtitle>{{ $t('pages.bookingProvidersShow.requestBookingDescription') }}</template>
    <template #content>
      <form ref="formRef" class="flex flex-col gap-4" @submit="submitForm">
        <FormSelectInput name="serviceId" :label="$t('common.service')" :options="props.serviceOptions" />
        <FormDatepickerInput name="date" :label="$t('common.date')" :disabled="! values.serviceId" :disabled-weekdays="props.blockedWeekdays" :min-date="new Date()" inline />
        <FormSelectInput name="serviceScheduleId" :label="$t('common.schedule')" :options="serviceSchedulesOptions" :loading="serviceDatepickerStatus === 'pending'" :disabled="! values.serviceId" />
        <FormSelectInput name="timeSlot" :label="$t('common.timeSlot')" :options="timeSlotOptions" :loading="serviceDatepickerStatus === 'pending'" :disabled="! values.serviceScheduleId" />
      </form>
    </template>
    <template #footer>
      <Button v-if="loggedIn" v-wave fluid :label="$t('common.requestBooking')" :loading="loading" :disabled="! meta.valid" @click="formRef?.requestSubmit()">
        <template #icon>
          <Icon name="mdi:calendar-check" />
        </template>
      </Button>
      <Button v-else v-wave fluid :label="$t('common.login')" :loading="loading" @click="() => useOidcAuth().login()">
        <template #icon>
          <Icon name="mdi:login" />
        </template>
      </Button>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';
import { gql } from 'nuxt-graphql-request/utils';
import * as yup from 'yup';
import type { Service, ServiceSchedule } from '~/types/models';

export interface GraphqlResponse {
  serviceDatepicker: {
    serviceSchedule: Pick<ServiceSchedule, 'id' | 'maxBookings' | 'timeSpan' | 'closeTime' | 'openTime'> & {
      service: Pick<Service, 'id' | 'name'>;
    };
    bookedTimeSlots: {
      timeSlot: number;
      currentBookings: number;
    }[];
  }[];
}

export interface RequestBookingResponse {
  createBooking: {
    id: string;
  };
}

export interface Props {
  serviceOptions?: {
    label: string;
    value: string;
  }[];
  blockedWeekdays?: number[];
}

const props = withDefaults(defineProps<Props>(), {
  serviceOptions: () => [],
  blockedWeekdays: () => [],
});

const loading = ref(false);

const { loggedIn } = useOidcAuth();
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

const { data: serviceDatepicker, status: serviceDatepickerStatus } = await useAsyncData(async () => {
  if (! values.serviceId || ! values.date) {
    return [];
  }

  const { serviceDatepicker } = await $graphql.default.request<GraphqlResponse>(gql`
    query serviceDatepicker($serviceId: ID!, $date: Date!) {
      serviceDatepicker(serviceId: $serviceId, date: $date) {
        serviceSchedule {
          id
          openTime
          closeTime
          service {
            name
          }
          maxBookings
          timeSpan
        }
        bookedTimeSlots {
          timeSlot
          currentBookings
        }
      }
    }
  `, {
    serviceId: values.serviceId,
    date: DateTime.fromJSDate(values.date).toFormat('yyyy-MM-dd'),
  });

  return serviceDatepicker;
}, {
  server: false,
  lazy: true,
  immediate: false,
  watch: [() => values.serviceId, () => values.date],
});

watch([() => values.serviceId, () => values.date], () => {
  resetField('serviceScheduleId', { value: undefined, touched: true });
  resetField('timeSlot', { value: undefined, touched: true });
});

const serviceSchedulesOptions = computed(() => {
  if (! serviceDatepicker.value) {
    return [];
  }

  return serviceDatepicker.value.map((serviceDatepicker) => ({
    label: convertMinutesForHumans(serviceDatepicker.serviceSchedule.openTime) + ' - ' + convertMinutesForHumans(serviceDatepicker.serviceSchedule.closeTime),
    value: serviceDatepicker.serviceSchedule.id,
  }));
});

const timeSlotOptions = computed(() => {
  if (! values.serviceScheduleId) {
    return [];
  }

  const found = serviceDatepicker.value?.find((serviceDatepicker) => {
    return serviceDatepicker.serviceSchedule.id === values.serviceScheduleId;
  });

  if (! found) {
    return [];
  }

  let i = 0;
  const timeSlots: {
    label: string;
    value: number;
    disabled?: boolean;
  }[] = [];

  while (found.serviceSchedule.openTime + (i * found.serviceSchedule.timeSpan) < found.serviceSchedule.closeTime) {
    const timeSlot = found.serviceSchedule.openTime + (i * found.serviceSchedule.timeSpan);
    const bookedTimeSlot = found.bookedTimeSlots.find((bookedTimeSlot) => bookedTimeSlot.timeSlot === timeSlot);

    const currentBookings = bookedTimeSlot
      ? bookedTimeSlot.currentBookings
      : 0;

    // Calculate end time - use closeTime if the standard end would exceed it
    const endTime = Math.min(timeSlot + found.serviceSchedule.timeSpan, found.serviceSchedule.closeTime);

    timeSlots.push({
      label: `${convertMinutesForHumans(timeSlot)} - ${convertMinutesForHumans(endTime)}`,
      value: timeSlot,
      disabled: currentBookings >= found.serviceSchedule.maxBookings,
    });

    i++;
  }

  return timeSlots;
});

const submitForm = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request<RequestBookingResponse>(gql`
      mutation createBooking($serviceScheduleId: ID!, $date: Date!, $timeSlot: Int!) {
        createBooking(input: { serviceScheduleId: $serviceScheduleId, date: $date, timeSlot: $timeSlot }) {
          id
        }
      }
    `, {
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

