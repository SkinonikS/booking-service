<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col gap-6">
      <section class="flex flex-col justify-between items-start">
        <h1 class="text-3xl font-bold mb-2">{{ bookingProvider?.name }}</h1>
        <div class="flex items-center gap-4 text-muted-foreground">
          <div class="flex items-center gap-2">
            <Icon name="mdi:map"/>
            {{ bookingProvider?.address }}
          </div>
          <div class="flex items-center gap-2" @mouseover="weekdaySchedulesRef?.show($event)" @mouseleave="weekdaySchedulesRef?.hide()">
            <Icon name="mdi:clock"/>
            {{ currentWeekday ? getWorkingTime(currentWeekday) : '-' }}
          </div>
          <Popover ref="weekdaySchedulesRef">
            <div class="grid grid-cols-[auto_auto] gap-2">
              <template v-for="weekdaySchedule in bookingProvider?.weekdaySchedules">
                <div class="col-span-1 text-right">{{ $t(`weekdays.${weekdaySchedule.weekday}`) }}</div>
                <div class="col-span-1 text-left">
                  {{ getWorkingTime(weekdaySchedule) }}
                </div>
              </template>
            </div>
          </Popover>
        </div>
      </section>
      <section v-if="bookingProvider?.galleryImages?.length" class="w-full">
        <Carousel :value="bookingProvider?.galleryImages" :num-visible="3" :num-scroll="3" :responsive-options="responsiveOptions">
          <template #item="{ data }">
            <div class="p-2">
              <CustomImg :src="data.fullUrl" width="100%" height="300px" class="rounded" />
            </div>
          </template>
        </Carousel>
      </section>
      <section class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4">
        <div class="lg:col-span-1">
          <Card>
            <template #title>{{ $t('common.aboutUs') }}</template>
            <template #content>
              {{ bookingProvider?.aboutUs }}
            </template>
          </Card>
        </div>
        <div class="lg:col-span-1">
          <div class="flex flex-col gap-4">
            <BookingProviderCardRequestBooking :service-options="serviceOptions" :blocked-weekdays="blockedWeekdays" />
            <BookingProviderCardContacts :email="bookingProvider?.email" :phone="bookingProvider?.phone" :website="bookingProvider?.website" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { gql } from 'nuxt-graphql-request/utils';
import * as yup from 'yup';
import type { BookingProvider, Media, Service, WeekdaySchedule } from '~/types/models';

interface GraphqlResponse {
  bookingProvider: BookingProvider & {
    galleryImages: Pick<Media, 'fullUrl'>[];
    weekdaySchedules: WeekdaySchedule[];
    services: Pick<Service, 'id' | 'name'>[];
  };
}

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

const { t } = useI18n();
const { params } = useRoute();
const { $graphql } = useNuxtApp();

const weekdaySchedulesRef = useTemplateRef('weekdaySchedulesRef');

const { data: bookingProvider } = await useAsyncData(async () => {
  const { bookingProvider } = await $graphql.default.request<GraphqlResponse>(gql`
    query bookingProvider($id: ID!) {
      bookingProvider(id: $id) {
        id
        name
        email
        phone
        website
        address
        aboutUs
        isActive
        galleryImages {
          fullUrl
        }
        weekdaySchedules {
          weekday
          openTime
          closeTime
          isActive
        }
        services {
          id
          name
        }
      }
    }
  `, { id: params.bookingProviderId.toString() });

  return bookingProvider;
});

if (! bookingProvider.value) {
  throw createError({ statusCode: 404, statusMessage: 'Booking provider not found' });
}

const serviceOptions = computed(() => {
  if (! bookingProvider.value) {
    return [];
  }

  return bookingProvider.value.services.map((service) => ({
    label: service.name,
    value: service.id,
  }));
});

const blockedWeekdays = computed(() => {
  if (! bookingProvider.value) {
    return [];
  }

  return bookingProvider.value.weekdaySchedules.reduce((carry, item) => {
    if (! item.isActive) {
      carry.push(item.weekday as number);
      return carry;
    }

    return carry;
  }, [] as number[]);
});

const currentWeekday = computed(() => {
  if (! bookingProvider.value) {
    return undefined;
  }

  return bookingProvider.value.weekdaySchedules.find((weekdaySchedule) => {
    return weekdaySchedule.weekday === new Date().getDay();
  });
});

const getWorkingTime = (weekdaySchedule: WeekdaySchedule) => {
  if (! weekdaySchedule.isActive) {
    return t('common.closed');
  }

  return convertMinutesForHumans(weekdaySchedule.openTime) + ' - ' + convertMinutesForHumans(weekdaySchedule.closeTime);
};
</script>
