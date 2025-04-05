<template>
  <Card v-for="item in bookingProviders" :dt="{ body: { gap: '1rem' } }" class="overflow-hidden">
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
    <template #content>
      <h3 class="font-semibold text-lg mb-2">{{ item.name }}</h3>
      <p class="text-xl font-bold">{{ item.address }}</p>
    </template>
    <template #footer>
      <Button v-wave fluid @click="redirectToBookingProvider(item.id)">{{ $t('view') }}</Button>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import type { BookingProvider, Media } from '~/types/models';

interface GraphqlResponse {
  randomBookingProviders: Pick<BookingProvider, 'id' | 'name' | 'address'>[] & {
    coverImage?: Pick<Media, 'id' | 'fullUrl'>;
  }[];
}

const { $graphql } = useNuxtApp();
const localeRoute = useLocaleRoute();

const { data: bookingProviders } = await useAsyncData(async () => {
  const { randomBookingProviders } = await $graphql.default.request<GraphqlResponse>(gql`
    query {
      randomBookingProviders(limit: 4) {
        id
        name
        address
        coverImage {
          fullUrl
        }
      }
    }
  `);

  return randomBookingProviders;
}, {
  lazy: true,
  server: false,
});

const redirectToBookingProvider = async (id: string) => {
  const localeRoutePath = localeRoute({
    name: 'booking-providers-bookingProviderId',
    params: {
      bookingProviderId: id,
    },
  });

  await navigateTo(localeRoutePath);
};
</script>
