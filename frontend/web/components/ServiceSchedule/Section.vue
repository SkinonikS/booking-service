<template>
  <DataTable :value="data?.weekdaySchedule?.serviceSchedules ?? []" :loading="status === 'pending'">
    <template #empty>
      <div class="flex flex-col items-center">
        <span>{{ $t('common.noServicesFound') }}</span>
      </div>
    </template>
    <Column field="name" :header="$t('common.name')">
      <template #body="{ data: item }">
        <span>{{ item.service.name }}</span>
      </template>
    </Column>
    <Column field="openTime" :header="$t('common.openTime')">
      <template #body="{ data: item }">
        <span>{{ convertMinutesForHumans(item.openTime) }}</span>
      </template>
    </Column>
    <Column field="closeTime" :header="$t('common.closeTime')">
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
    <Column field="actions">
      <template #body="{ data: item }">
        <div class="flex flex-row-reverse gap-2">
          <Button v-tooltip.top="$t('common.edit')" v-wave text rounded @click="editServiceSchedule(item.id)">
            <template #icon>
              <Icon name="mdi:pencil" />
            </template>
          </Button>
        </div>
      </template>
    </Column>
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
