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

const luxonCancelledAt = computed(() => {
  return props.cancelledAt
    ? convertDate(props.cancelledAt)
    : undefined;
});

const luxonBookingDate = computed(() => convertDate(props.bookingDate));

const isUpcoming = computed(() => luxonBookingDate.value > DateTime.now());
const isPast = computed(() => luxonBookingDate.value < DateTime.now());
const isCancelled = computed(() => !! luxonCancelledAt.value && luxonCancelledAt.value < DateTime.now());
</script>
