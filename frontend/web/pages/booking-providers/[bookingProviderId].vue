<template>
  <BasePageContainer>
    <div class="flex flex-col gap-6">
      <section class="flex flex-col justify-between items-start">
        <h1 class="text-3xl font-bold mb-2">{{ data?.bookingProvider?.name }}</h1>
        <div class="flex items-center gap-4 text-muted-foreground">
          <div class="flex items-center gap-2">
            <Icon name="mdi:map"/>
            {{ data?.bookingProvider?.address }}
          </div>
          <BookingProviderWorkingTime :weekdays="data?.bookingProvider?.weekdaySchedules" />
        </div>
      </section>
      <section v-if="data?.bookingProvider?.galleryImages?.length ?? 0 > 0" class="w-full">
        <Carousel :value="data?.bookingProvider?.galleryImages ?? []" :num-visible="3" :num-scroll="3" :responsive-options="responsiveOptions">
          <template #item="{ data: item }">
            <div class="p-2">
              <BaseCommonImage :src="item.fullUrl" width="100%" height="300px" class="rounded" :alt="item.baseName" />
            </div>
          </template>
        </Carousel>
      </section>
      <section class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4">
        <div class="lg:col-span-1">
          <Card>
            <template #title>{{ $t('public.bookingProvider.about.title') }}</template>
            <template #content>
              {{ data?.bookingProvider?.aboutUs }}
            </template>
          </Card>
        </div>
        <div class="lg:col-span-1">
          <div class="flex flex-col gap-4">
            <BookingProviderRequestBookingPanel :services="services" :blocked-weekdays="blockedWeekdays" />
            <BaseBookingProviderContactsPanel :email="data?.bookingProvider?.email" :phone="data?.bookingProvider?.phone" :website="data?.bookingProvider?.website">
              <template #title>{{ $t('public.bookingProvider.contacts.title') }}</template>
              <template #subtitle>{{ $t('public.bookingProvider.contacts.description') }}</template>
            </BaseBookingProviderContactsPanel>
          </div>
        </div>
      </section>
    </div>
  </BasePageContainer>
</template>

<script setup lang="ts">
import _ from 'lodash';
import * as yup from 'yup';
import { GET_BOOKING_PROVIDER } from '~/graphql/booking-provider-page';
import { graphql } from '~/utils/graphql';
import type { Media } from '~/utils/graphql/graphql';

definePageMeta({
  layout: 'default',
  validate: (route) => yup.object({
    bookingProviderId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

const responsiveOptions = [
  {
    breakpoint: '1400px',
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: '1199px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '767px',
    numVisible: 1,
    numScroll: 1,
  },
];

const { params } = useRoute();
const { $graphql } = useNuxtApp();

const { data } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_BOOKING_PROVIDER), {
    id: params.bookingProviderId.toString(),
  });
});

if (! data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Booking provider not found', fatal: true });
}

useSeoMeta({
  title: data.value?.bookingProvider?.name,
  description: 'Find and Book Amazing Experiences. Explore our features and services.',
});

const services = computed(() => {
  if (! data.value) {
    return [];
  }

  return _.map(data.value?.bookingProvider?.services, (service) => ({
    label: service.name,
    value: service.id,
  }));
});

const blockedWeekdays = computed(() => {
  if (! data.value) {
    return [];
  }

  return _.reduce(data.value?.bookingProvider?.weekdaySchedules, (carry, item) => {
    if (! item.isActive) {
      carry.push(item.weekday as number);
      return carry;
    }

    return carry;
  }, [] as number[]);
});
</script>
