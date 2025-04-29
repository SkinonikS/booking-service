<template>
  <div class="container mx-auto">
    <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('common.bookingProviders') }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <BaseBookingProviderPanel
        v-for="bookingProvider in data?.randomBookingProviders"
        class="row-span-1"
        :title="bookingProvider.name"
        :address="bookingProvider.address"
        :cover="bookingProvider?.coverImage?.fullUrl"
        :category="bookingProvider.category.name"
        @click="visitBookingProvider(bookingProvider.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GET_RANDOM_BOOKING_PROVIDERS } from '~/graphql/home-page';
import { graphql } from '~/utils/graphql';

const { $graphql } = useNuxtApp();
const localeRoute = useLocaleRoute();

const { data } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_RANDOM_BOOKING_PROVIDERS));
});

const visitBookingProvider = async (id: string) => {
  const localeRoutePath = localeRoute({
    name: 'booking-providers-bookingProviderId',
    params: {
      bookingProviderId: id,
    },
  });

  await navigateTo(localeRoutePath);
};
</script>
