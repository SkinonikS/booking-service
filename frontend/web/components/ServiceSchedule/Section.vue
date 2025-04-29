<template>
  <DataTable :value="data?.weekdaySchedule?.serviceSchedules ?? []" :loading="status === 'pending'">
    <Column field="name" :header="$t('labels.name')">
      <template #body="{ data: item }">
        <span>{{ item.service.name }}</span>
      </template>
    </Column>
    <Column field="openTime" :header="$t('labels.openTime')">
      <template #body="{ data: item }">
        <span>{{ convertMinutesForHumans(item.openTime) }}</span>
      </template>
    </Column>
    <Column field="closeTime" :header="$t('labels.closeTime')">
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
    <Column field="actions">
      <template #body="{ data: item }">
        <div class="flex flex-row-reverse gap-2">
          <Button v-tooltip.top="$t('actions.edit')" v-wave text rounded @click="editServiceSchedule(item.id)">
            <template #icon>
              <Icon name="mdi:pencil" />
            </template>
          </Button>
        </div>
      </template>
    </Column>
    <template #empty>
      <div class="flex flex-col items-center">
        <span>{{ $t('management.schedules.services.noResults.title') }}</span>
      </div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { GET_SERVICE_SCHEDULES } from '~/graphql/management/weekday-schedules/edit-page';
import { graphql } from '~/utils/graphql';

export interface Props {
  weekdayScheduleId: string;
}

const { $graphql } = useNuxtApp();
const localeRoute = useLocaleRoute();

const props = defineProps<Props>();

const { data, status } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_SERVICE_SCHEDULES), {
    id: props.weekdayScheduleId,
  });
}, {
  lazy: true,
  server: false,
});

const editServiceSchedule = async (serviceScheduleId: string) => {
  const localeRoutePath = localeRoute({
    name: 'management-bookingProviderId-weekday-schedules-weekdayScheduleId-service-schedules-serviceScheduleId-edit',
    params: { serviceScheduleId },
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
