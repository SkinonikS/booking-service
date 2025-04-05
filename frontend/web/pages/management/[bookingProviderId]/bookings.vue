<template>
  <PageContainer>
    <Card>
      <template #title>{{ $t('management.pages.bookings.title') }}</template>
      <template #subtitle>{{ $t('management.pages.bookings.description') }}</template>
      <template #content>
        <DataTable :value="bookings ?? []" :loading="status === 'pending' || loading">
          <template #empty>
            <div class="flex flex-col items-center">
              <span>{{ $t('common.noBookingsFound') }}</span>
            </div>
          </template>
          <Column field="name" :header="$t('common.service')">
            <template #body="{ data: item }">
              <span>{{ item.serviceSchedule.service.name }}</span>
            </template>
          </Column>
          <Column field="name" :header="$t('common.name')">
            <template #body="{ data: item }">
              <span>{{ item.user.name }}</span>
            </template>
          </Column>
          <Column field="email" :header="$t('common.email')">
            <template #body="{ data: item }">
              <span>{{ item.user.email }}</span>
            </template>
          </Column>
          <Column field="date" :header="$t('common.date')">
            <template #body="{ data: item }">
              <span>{{ item.date }}</span>
            </template>
          </Column>
          <Column field="timeSlot" :header="$t('common.time')">
            <template #body="{ data: item }">
              <span>{{ convertMinutesForHumans(item.timeSlot) }}</span>
            </template>
          </Column>
          <Column field="status" :header="$t('common.status')">
            <template #body="{ data: item }">
              <MyBookingsDataTableStatusBadge :booking-date="item.date" :cancelled-at="item.cancelledAt" :cancellation-reason="item.cancellationReason" />
            </template>
          </Column>
          <Column field="actions" body-style="text-align: right">
            <template #body="{ data: item }">
              <Button v-wave v-tooltip.top="$t('common.cancelBooking')" severity="danger" :disabled="!! item.cancelledAt" text rounded @click="cancelBooking(item)">
                <template #icon>
                  <Icon name="mdi:close" />
                </template>
              </Button>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </PageContainer>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import * as yup from 'yup';
import type { Booking, Service, User } from '~/types/models';

export interface GraphqlResponse {
  bookings: Booking & {
    user: Pick<User, 'id' | 'name' | 'email'>;
    serviceSchedule: {
      service: Pick<Service, 'id' | 'name'>;
    };
  };
}

definePageMeta({
  layout: 'management',
  validate: (route) => yup.object({
    bookingProviderId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

const loading = ref(false);

const { $graphql } = useNuxtApp();
const route = useRoute();
const toast = useToast();

const { data: bookings, status } = await useAsyncData(async () => {
  const { bookings } = await $graphql.default.request<GraphqlResponse>(gql`
    query bookings($id: ID!) {
      bookings(bookingProviderId: $id) {
        id
        date
        timeSlot
        serviceSchedule {
          service {
            id
            name
          }
        }
        user {
          id
          name
          email
        }
        cancelledAt
        cancellationReason
      }
    }
  `, { id: route.params.bookingProviderId.toString() });

  return bookings;
});

const cancelBooking = async (booking: Booking) => {
  loading.value = true;

  try {
    await $graphql.default.request(gql`
      mutation cancelBooking($id: ID!, $cancellationReason: String!) {
        cancelBooking(id: $id, input: { cancellationReason: $cancellationReason }) {
          id
          cancelledAt
          cancellationReason
        }
      }
    `, {
      id: booking.id,
      cancellationReason: 'Cancelled by provider.',
    });

    booking.cancelledAt = new Date().toISOString();

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
