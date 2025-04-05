<template>
  <PageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('pages.meBookings.title') }}</template>
        <template #subtitle>{{ $t('pages.meBookings.description') }}</template>
        <template #content>
          <DataTable :value="me?.bookings ?? []" :loading="status === 'pending' || loading">
            <Column field="bookingProvider" :header="$t('common.bookingProvider')">
              <template #body="{ data: item }">
                <span>{{ item.serviceSchedule.weekdaySchedule.bookingProvider.name }}</span>
              </template>
            </Column>
            <Column field="service" :header="$t('common.service')">
              <template #body="{ data: item }">
                <span>{{ item.serviceSchedule.service.name }}</span>
              </template>
            </Column>
            <Column field="date" :header="$t('common.date')">
              <template #body="{ data: item }">
                <span>{{ item.date }}</span>
              </template>
            </Column>
            <Column field="time" :header="$t('common.time')">
              <template #body="{ data: item }">
                <span>{{ convertMinutesForHumans(item.timeSlot) }}</span>
              </template>
            </Column>
            <Column field="status" :header="$t('common.status')">
              <template #body="{ data: item }">
                <MyBookingsDataTableStatusBadge :booking-date="item.date" :cancellation-reason="item.cancellationReason" :cancelled-at="item.cancelledAt" />
              </template>
            </Column>
            <Column field="actions" body-style="text-align: right">
              <template #body="{ data: item }">
                <Button v-tooltip.top="$t('common.cancelBooking')" v-wave :disabled="item.cancelledAt" severity="danger" text rounded @click="cancelBooking(item)">
                  <template #icon>
                    <Icon name="mdi:close" />
                  </template>
                </Button>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import type { Booking, BookingProvider, Service, ServiceSchedule } from '~/types/models';

export interface GraphqlResponse {
  me: {
    bookings: Pick<Booking, 'id' | 'date' | 'timeSlot' | 'cancelledAt' | 'cancellationReason'>[] & {
      serviceSchedule: Pick<ServiceSchedule, 'id' | 'maxBookings' | 'timeSpan' | 'closeTime' | 'openTime'> & {
        service: Pick<Service, 'id' | 'name'>;
        weekdaySchedule: {
          bookingProvider: Pick<BookingProvider, 'id' | 'name'>;
        };
      };
    };
  };
}

definePageMeta({
  layout: 'default',
});

const loading = ref(false);

const { $graphql } = useNuxtApp();
const { loggedIn } = useOidcAuth();
const toast = useToast();

if (! loggedIn.value) {
  throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
}

const { data: me, status, error } = await useAsyncData(async () => {
  const { me } = await $graphql.default.request<GraphqlResponse>(gql`
    query bookings {
      me {
        id
        bookings {
          id
          cancelledAt
          cancellationReason
          date
          timeSlot
          serviceSchedule {
            id
            weekdaySchedule {
              bookingProvider {
                id
                name
              }
            }
            service {
              id
              name
            }
          }
        }
      }
    }
  `);

  return me;
});


if (! me.value) {
  throw createError({ statusCode: 404, statusMessage: error.value?.message || 'Bookings not found' });
}

const cancelBooking = async (booking: Booking) => {
  loading.value = true;

  try {
    await $graphql.default.request(gql`
      mutation cancelBooking($bookingId: ID!) {
        cancelBooking(id: $bookingId, input: { cancellationReason: "User cancelled" }) {
          id
          cancelledAt
          cancellationReason
        }
      }
    `, { bookingId: booking.id });

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
