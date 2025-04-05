<template>
  <DataTable :value="weekdaySchedule?.serviceSchedules ?? []" :loading="status === 'pending'">
    <template #empty>
      <div class="flex flex-col items-center">
        <span>{{ $t('common.noServicesFound') }}</span>
      </div>
    </template>
    <!-- @vue-expect-error -->
    <template #default>
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
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import type { Service, ServiceSchedule, WeekdaySchedule } from '~/types/models';

export interface Props {
  weekdayScheduleId?: string;
}

export interface GraphqlResponse {
  weekdaySchedule: Pick<WeekdaySchedule, 'id' | 'openTime' | 'closeTime' | 'isActive'> & {
    serviceSchedules: Pick<ServiceSchedule, 'id' | 'openTime' | 'closeTime' | 'isActive'> & {
      service: Pick<Service, 'name'>;
    }[];
  };
}

const { $graphql } = useNuxtApp();
const localeRoute = useLocaleRoute();

const props = withDefaults(defineProps<Props>(), {
  weekdayScheduleId: undefined,
});

const { data: weekdaySchedule, status } = await useAsyncData(async () => {
  if (! props.weekdayScheduleId) {
    return null;
  }

  const { weekdaySchedule } = await $graphql.default.request<GraphqlResponse>(gql`
    query serviceSchedules($id: ID!) {
      weekdaySchedule(id: $id) {
        serviceSchedules {
          id
          openTime
          closeTime
          isActive
          service {
            name
          }
        }
      }
    }
  `, { id: props.weekdayScheduleId });

  return weekdaySchedule;
}, {
  lazy: true,
  server: false,
  watch: [() => props.weekdayScheduleId],
});

const editServiceSchedule = async (serviceScheduleId: string) => {
  const localeRoutePath = localeRoute({
    name: 'management-bookingProviderId-weekday-schedules-weekdayScheduleId-service-schedules-serviceScheduleId-edit',
    params: { serviceScheduleId },
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
