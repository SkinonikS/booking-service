<template>
  <BasePageContainer>
    <Card>
      <template #title>{{ $t('management.bookings.title') }}</template>
      <template #subtitle>{{ $t('management.bookings.description') }}</template>
      <template #content>
        <DataTable :value="data?.bookings ?? []" :loading="status === 'pending' || loading">
          <Column field="name" :header="$t('labels.service')">
            <template #body="{ data: item }">
              <span>{{ item.serviceSchedule.service.name }}</span>
            </template>
          </Column>
          <Column field="name" :header="$t('labels.name')">
            <template #body="{ data: item }">
              <span>{{ item.user.name }}</span>
            </template>
          </Column>
          <Column field="email" :header="$t('labels.email')">
            <template #body="{ data: item }">
              <span>{{ item.user.email }}</span>
            </template>
          </Column>
          <Column field="date" :header="$t('labels.date')">
            <template #body="{ data: item }">
              <span>{{ item.date }}</span>
            </template>
          </Column>
          <Column field="timeSlot" :header="$t('labels.time')">
            <template #body="{ data: item }">
              <span>{{ convertMinutesForHumans(item.timeSlot) }}</span>
            </template>
          </Column>
          <Column field="status" :header="$t('labels.status')">
            <template #body="{ data: item }">
              <BaseBookingProviderStatusBadge :booking-date="item.date" :cancelled-at="item.cancelledAt" :cancellation-reason="item.cancellationReason" />
            </template>
          </Column>
          <Column field="actions" body-style="text-align: right">
            <template #body="{ data: item }">
              <Button v-wave v-tooltip.top="$t('actions.cancelBooking')" severity="danger" :disabled="!! item.cancelledAt" text rounded @click="cancelBooking(item)">
                <template #icon>
                  <Icon name="mdi:close" />
                </template>
              </Button>
            </template>
          </Column>
          <template #empty>
            <div class="flex flex-col items-center">
              <span>{{ $t('management.bookings.noResults.title') }}</span>
            </div>
          </template>
        </DataTable>
      </template>
    </Card>
  </BasePageContainer>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { GET_BOOKINGS, CANCEL_BOOKING } from '~/graphql/management/bookings-page';
import { graphql } from '~/utils/graphql';
import type { Booking } from '~/utils/graphql/graphql';

definePageMeta({
  layout: 'management',
  middleware: ['is-verified'],
  validate: (route) => yup.object({
    bookingProviderId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

useSeoMeta({
  title: 'Bookings',
});

const loading = ref(false);

const { $graphql } = useNuxtApp();
const route = useRoute();
const toast = useToast();

const { data, status } = await useAsyncData(() => $graphql.default.request(graphql(/* GraphQL */ GET_BOOKINGS), {
  id: route.params.bookingProviderId.toString(),
}));

const cancelBooking = async (booking: Booking) => {
  loading.value = true;

  try {
    await $graphql.default.request(graphql(/* GraphQL */ CANCEL_BOOKING), {
      id: booking.id,
      cancellationReason: 'Cancelled by provider.',
    });

    booking.cancelledAt = new Date().toISOString();
    booking.cancellationReason = 'Cancelled by provider';

    toast.add({ summary: 'Booking cancelled successfully', severity: 'success' });
  } catch (e) {
    if (e instanceof Error) {
      toast.add({ summary: e.message, severity: 'error' });
    } else {
      toast.add({ summary: 'Error while cancelling booking, please try again.', severity: 'error' });
    }
  } finally {
    loading.value = false;
  }
};
</script>
