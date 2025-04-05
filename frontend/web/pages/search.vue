<template>
  <PageContainer>
    <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
      <div class="col-span-1">
        <div class="md:sticky md:top-4">
          <SearchMenu @request-search="refresh()" />
        </div>
      </div>
      <div class="col-span-1">
        <div v-if="!! bookingProviders" class="flex flex-col gap-4">
          <Paginator v-model:first="paginator.offset.value" :class="paginatorClasses" :total-records="paginator.total.value" :rows="paginator.perPage.value" always-show />
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            <Card v-for="item in bookingProviders.data" :pt="{ body: { class: 'h-full' }, content: { class: 'h-full' } }" class="overflow-hidden">
              <template #header>
                <template v-if="item.coverImage">
                  <CustomImg width="100%" height="300px" object-fit="cover" :aspect-ratio="1" object-position="top" :src="item.coverImage.fullUrl" />
                </template>
                <template v-else>
                  <div class="flex flex-col justify-center items-center h-[300px]">
                    <Icon name="mdi:note-off-outline" size="4rem" />
                    <div class="text-sm">{{ $t('common.noImageAvailable') }}</div>
                  </div>
                </template>
              </template>
              <template #title>
                <h2 v-tooltip.top="item.name" class="text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{{ item.name }}</h2>
              </template>
              <template #content>
                <div class="text-sm flex flex-row items-center gap-2">
                  <Icon name="mdi:map" />{{ item.address }}
                </div>
              </template>
              <template #footer>
                <div class="flex flex-row gap-2">
                  <Button v-wave class="flex-1" :label="$t('common.view')" @click="redirectToBookingProvider(item.id)">
                    <template #icon>
                      <Icon name="mdi:arrow-right" />
                    </template>
                  </Button>
                </div>
              </template>
            </Card>
          </div>
          <Paginator v-model:first="paginator.offset.value" :class="paginatorClasses" :total-records="paginator.total.value" :rows="paginator.perPage.value" always-show />
        </div>
        <div v-else class="flex flex-col gap-4">
          <div class="flex justify-center items-center p-6">
            <Icon name="mdi:note-off-outline" size="6rem" />
          </div>
          <h2 class="text-xl font-semibold text-center">{{ $t('pages.search.noResultsFound.title') }}</h2>
          <div class="text-sm flex flex-row justify-center items-center gap-2">{{ $t('pages.search.noResultsFound.description11') }}</div>
          <div class="flex flex-col gap-2 text-center">{{ $t('pages.search.noResultsFound.description2') }}</div>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
import { gql } from 'graphql-request';
import type { GraphqlPaginatedResponse } from '~/types/graphql';
import type { BookingProvider, Media, WeekdaySchedule } from '~/types/models';

export type GraphqlResponse = {
  bookingProviders: GraphqlPaginatedResponse<
    Pick<BookingProvider, 'id' | 'name' | 'address'> & {
      weekdaySchedules: Pick<WeekdaySchedule, 'weekday' | 'openTime' | 'closeTime'>[];
      coverImage?: Pick<Media, 'fullUrl'>;
    }
  >;
};

const loadingIndicator = useLoadingIndicator();

const paginator = useOffsetPaginator({
  total: 0, // dummy value
  page: 1,
  perPage: 24,
});

const { $graphql } = useNuxtApp();
const localeRoute = useLocaleRoute();
const searchStore = storeToRefs(useSearchStore());

const { refresh, status, data: bookingProviders } = await useAsyncData(async () => {
  loadingIndicator.start();

  const { bookingProviders } = await $graphql.default.request<GraphqlResponse>(gql`
    query search($categories: [ID!], $page: Int, $first: Int) {
      bookingProviders(categories: $categories, page: $page, first: $first) {
        data {
          id
          name
          address
          coverImage {
            fullUrl
          }
          weekdaySchedules {
            weekday
            openTime
            closeTime
          }
        }
        paginatorInfo {
          perPage
          total
          currentPage
        }
      }
    }
  `, {
    first: paginator.perPage.value,
    page: paginator.offset.value,
    date: searchStore.date.value?.toISOString(),
    categories: searchStore.categories.value,
  });

  loadingIndicator.finish();

  return bookingProviders;
}, {
  watch: [
    paginator.offset,
  ],
});

if (! bookingProviders.value) {
  throw createError({ statusCode: 404, statusMessage: 'Booking providers not found' });
}

onMounted(() => {
  paginator.total.value = bookingProviders.value?.paginatorInfo.total || 0;
});

const paginatorClasses = computed(() => ({
  'paginator--disabled': status.value === 'pending',
}));

const redirectToBookingProvider = async (id: string) => {
  const localeRoutePath = localeRoute({
    name: 'booking-providers-bookingProviderId',
    params: { bookingProviderId: id },
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
