<template>
  <BasePageContainer>
    <Card>
      <template #title>{{ $t('management.schedules.weekday.title') }}</template>
      <template #subtitle>{{ $t('management.schedules.weekday.description') }}</template>
      <template #content>
        <DataTable :value="data?.bookingProvider?.weekdaySchedules ?? []" :loading="status === 'pending'">
          <Column name="weekday" :header="$t('labels.weekday')">
            <template #body="{ data: item }">
              <span>{{ $t(`weekdays.${item.weekday}`) }}</span>
            </template>
          </Column>
          <Column name="openTime" :header="$t('labels.openTime')">
            <template #body="{ data: item }">
              <span>{{ convertMinutesForHumans(item.openTime) }}</span>
            </template>
          </Column>
          <Column name="closeTime" :header="$t('labels.closeTime')">
            <template #body="{ data: item }">
              <span>{{ convertMinutesForHumans(item.closeTime) }}</span>
            </template>
          </Column>
          <Column name="status" :header="$t('labels.status')">
            <template #body="{ data: item }">
              <Badge :severity="item.isActive ? 'success' : 'danger'">
                {{ item.isActive ? $t('statuses.active') : $t('statuses.inactive') }}
              </Badge>
            </template>
          </Column>
          <Column name="actions" body-style="text-align: right">
            <template #body="{ data: item }">
              <Button v-wave v-tooltip.top="$t('actions.edit')" text rounded @click="viewWeekdaySchedule(item.id)">
                <template #icon>
                  <Icon name="mdi:pencil" />
                </template>
              </Button>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </BasePageContainer>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { GET_WEEKDAYS_SCHEDULES } from '~/graphql/management/weekday-schedules/index-page';
import { graphql } from '~/utils/graphql';
import { convertMinutesForHumans } from '~/utils/time';

definePageMeta({
  layout: 'management',
  middleware: ['is-verified'],
  validate: (route) => yup.object({
    bookingProviderId: yup.string().uuid(),
  }).isValid(route.params),
});

useSeoMeta({
  title: 'Weekday schedules',
});

const { $graphql } = useNuxtApp();
const localeRoute = useLocaleRoute();
const route = useRoute();

const { data, status } = await useAsyncData(async () => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_WEEKDAYS_SCHEDULES), {
    bookingProviderId: route.params.bookingProviderId.toString(),
  });
});

if (! data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
}

const viewWeekdaySchedule = async (weekdayScheduleId: string) => {
  const localeRoutePath = localeRoute({
    name: 'management-bookingProviderId-weekday-schedules-weekdayScheduleId-edit',
    params: { weekdayScheduleId },
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
