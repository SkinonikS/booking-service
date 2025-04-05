<template>
  <PageContainer>
    <Card>
      <template #title>{{ $t('management.pages.weekdaySchedules.title') }}</template>
      <template #subtitle>{{ $t('management.pages.weekdaySchedules.description') }}</template>
      <template #content>
        <DataTable :value="bookingProvider?.weekdaySchedules ?? []" :loading="status === 'pending'">
          <Column name="weekday" :header="$t('common.weekday')">
            <template #body="{ data: item }">
              <span>{{ $t(`weekdays.${item.weekday}`) }}</span>
            </template>
          </Column>
          <Column name="openTime" :header="$t('common.openTime')">
            <template #body="{ data: item }">
              <span>{{ convertMinutesForHumans(item.openTime) }}</span>
            </template>
          </Column>
          <Column name="closeTime" :header="$t('common.closeTime')">
            <template #body="{ data: item }">
              <span>{{ convertMinutesForHumans(item.closeTime) }}</span>
            </template>
          </Column>
          <Column name="status" :header="$t('common.status')">
            <template #body="{ data: item }">
              <Badge :severity="item.isActive ? 'success' : 'danger'">
                {{ item.isActive ? $t('common.active') : $t('common.inactive') }}
              </Badge>
            </template>
          </Column>
          <Column name="actions" body-style="text-align: right">
            <template #body="{ data: item }">
              <Button v-wave v-tooltip.top="$t('common.edit')" text rounded @click="editWeekdaySchedule(item.id)">
                <template #icon>
                  <Icon name="mdi:pencil" />
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
import _ from 'lodash';
import { gql } from 'nuxt-graphql-request/utils';
import * as yup from 'yup';
import type { WeekdaySchedule } from '~/types/models';
import { convertMinutesForHumans } from '~/utils/time';

interface GraphqlResponse {
  bookingProvider: {
    weekdaySchedules: Pick<WeekdaySchedule, 'id' | 'weekday' | 'openTime' | 'closeTime' | 'isActive'>[];
  };
}

definePageMeta({
  layout: 'management',
  validate: (route) => yup.object({
    bookingProviderId: yup.string().uuid(),
  }).isValid(route.params),
});

const { $graphql } = useNuxtApp();
const localeRoute = useLocaleRoute();
const route = useRoute();

const { data: bookingProvider, status } = await useAsyncData(async () => {
  const { bookingProvider } = await $graphql.default.request<GraphqlResponse>(gql`
    query weekdaySchedules($bookingProviderId: ID!) {
      bookingProvider(id: $bookingProviderId) {
        weekdaySchedules {
          id
          weekday
          openTime
          closeTime
          isActive
        }
      }
    }
  `, {
    bookingProviderId: route.params.bookingProviderId,
  });

  return bookingProvider;
});

if (! bookingProvider.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

const editWeekdaySchedule = async (weekdayScheduleId: string) => {
  const localeRoutePath = localeRoute({
    name: 'management-bookingProviderId-weekday-schedules-weekdayScheduleId-edit',
    params: { weekdayScheduleId },
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
