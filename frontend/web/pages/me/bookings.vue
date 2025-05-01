<template>
  <BasePageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('public.userBookings.title') }}</template>
        <template #subtitle>{{ $t('public.userBookings.description') }}</template>
        <template #content>
          <DataTable :value="data?.me?.bookings ?? []" :loading="status === 'pending' || loading">
            <Column field="bookingProvider" :header="$t('labels.bookingProvider')">
              <template #body="{ data: item }">
                <span>{{ item.serviceSchedule.weekdaySchedule.bookingProvider.name }}</span>
              </template>
            </Column>
            <Column field="service" :header="$t('labels.service')">
              <template #body="{ data: item }">
                <span>{{ item.serviceSchedule.service.name }}</span>
              </template>
            </Column>
            <Column field="date" :header="$t('labels.date')">
              <template #body="{ data: item }">
                <span>{{ item.date }}</span>
              </template>
            </Column>
            <Column field="time" :header="$t('labels.time')">
              <template #body="{ data: item }">
                <span>{{ convertMinutesForHumans(item.timeSlot) }}</span>
              </template>
            </Column>
            <Column field="status" :header="$t('labels.status')">
              <template #body="{ data: item }">
                <BaseBookingProviderStatusBadge :booking-date="item.date" :time-slot="item.timeSlot" :cancellation-reason="item.cancellationReason" :cancelled-at="item.cancelledAt" />
              </template>
            </Column>
            <Column field="actions" body-style="text-align: right">
              <template #body="{ data: item }">
                <Button v-tooltip.top="$t('actions.cancelBooking')" v-wave :disabled="item.cancelledAt" severity="danger" text rounded @click="cancelBooking(item)">
                  <template #icon>
                    <Icon name="mdi:close" />
                  </template>
                </Button>
              </template>
            </Column>
            <template #empty>
              <div class="text-center">{{ $t('public.userBookings.noResults.title') }}</div>
            </template>
          </DataTable>
        </template>
      </Card>
    </div>
  </BasePageContainer>
</template>

<script setup lang="ts">
import { GET_MY_BOOKINGS, CANCEL_BOOKING } from '~/graphql/me-bookings-page';
import { graphql } from '~/utils/graphql';
import type { Booking } from '~/utils/graphql/graphql';

definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'My bookings',
});

const loading = ref(false);

const { $graphql } = useNuxtApp();
const { loggedIn } = useOidcAuth();
const toast = useToast();

if (! loggedIn.value) {
  throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
}

const { data, status, error } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_MY_BOOKINGS));
});


if (! data.value) {
  throw createError({ statusCode: 404, statusMessage: error.value?.message || 'Bookings not found' });
}

const cancelBooking = async (booking: Booking) => {
  loading.value = true;

  try {
    await $graphql.default.request(graphql(/* GraphQL */ CANCEL_BOOKING), {
      bookingId: booking.id,
    });

    booking.cancelledAt = new Date().toISOString();
    booking.cancellationReason = 'User cancelled';

    toast.add({ summary: 'Booking cancelled successfully', severity: 'success' });
  } catch (error) {
    if (error instanceof Error) {
      toast.add({ summary: error.message, severity: 'error' });
    } else {
      toast.add({ summary: 'An error occurred while cancelling the booking', severity: 'error' });
    }
  } finally {
    loading.value = false;
  }
};
</script>
