<template>
  <BasePageContainer>
    <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
      <div class="col-span-1">
        <div class="md:sticky md:top-4">
          <SearchAsideFilter @submit="refresh()" />
        </div>
      </div>
      <div class="col-span-1">
        <BaseCommonPaginationContainer v-if="data?.bookingProviders" v-model:offset="offset" :per-page="perPage" :total="total" :disabled="status === 'pending'" :visible-paginators="total > 0">
          <template #content>
            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
              <BaseBookingProviderPanel
                v-for="bookingProvider in data?.bookingProviders?.data"
                class="col-span-1"
                :title="bookingProvider.name"
                :address="bookingProvider.address"
                :cover="bookingProvider?.coverImage?.fullUrl"
                :category="bookingProvider.category.name"
                @click="visitBookingProvider(bookingProvider.id)"
              />
            </div>
          </template>
        </BaseCommonPaginationContainer>
        <SearchEmpty v-else />
      </div>
    </div>
  </BasePageContainer>
</template>

<script lang="ts" setup>
import { GET_BOOKING_PROVIDERS } from '~/graphql/search-page';
import { graphql } from '~/utils/graphql';

useSeoMeta({
  title: 'Catalog',
  description: 'Find and Book Amazing Experiences. Explore our features and services.',
});

const { perPage, total, offset, getCurrentPage } = useOffsetPaginator({
  total: 0,
  page: 1,
  perPage: 24,
});

const { $graphql } = useNuxtApp();
const localeRoute = useLocaleRoute();
const loadingIndicator = useLoadingIndicator();
const searchStore = storeToRefs(useSearchStore());

const { data, status, refresh } = await useAsyncData(async () => {
  loadingIndicator.start();

  const response = await $graphql.default.request(graphql(/* GraphQL */ GET_BOOKING_PROVIDERS), {
    first: perPage.value,
    page: getCurrentPage(),
    address: searchStore.address.value,
    date: searchStore.date.value?.toISOString(),
    categories: searchStore.categories.value,
  });

  loadingIndicator.finish();

  return response;
}, {
  watch: [offset],
});

watch(data, () => {
  total.value = data.value?.bookingProviders?.paginatorInfo.total ?? 0;
}, { immediate: true });

const visitBookingProvider = async (id: string) => {
  const localeRoutePath = localeRoute({
    name: 'booking-providers-bookingProviderId',
    params: { bookingProviderId: id },
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
