<template>
  <Badge
    v-if="isCancelled"
    v-tooltip.top="props.cancellationReason"
    severity="danger"
  >{{ $t('statuses.cancelled') }}</Badge>
  <Badge
    v-else-if="isUpcoming"
    severity="info"
  >{{ $t('statuses.upcoming') }}</Badge>
  <Badge
    v-else-if="isPast"
    severity="warning"
  >{{ $t('statuses.past') }}</Badge>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon';

export interface Props {
  bookingDate: string | DateTime;
  timeSlot?: number;
  cancelledAt?: string | DateTime;
  cancellationReason?: string;
}

const props = defineProps<Props>();

const convertDate = (date: string | DateTime) => {
  if (typeof date === 'string') {
    return DateTime.fromISO(date);
  }

  return date;
};

const luxonBookingDate = computed(() => {
  const date = convertDate(props.bookingDate);

  if (props.timeSlot) {
    return date.plus({ minutes: props.timeSlot });
  }

  return date;
});

const luxonCancelledAt = computed(() => {
  return props.cancelledAt
    ? convertDate(props.cancelledAt)
    : undefined;
});

const isPast = computed(() => DateTime.now() >= luxonBookingDate.value);
const isUpcoming = computed(() => DateTime.now() <= luxonBookingDate.value);
const isCancelled = computed(() => !! luxonCancelledAt.value && luxonCancelledAt.value < DateTime.now());
</script>
