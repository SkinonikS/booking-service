<template>
  <div class="flex items-center gap-2" @mouseover="weekdaySchedulesRef?.show($event)" @mouseleave="weekdaySchedulesRef?.hide()">
    <Icon name="mdi:clock" />
    {{ currentWeekdayWorkingTime }}
  </div>
  <Popover ref="weekdaySchedulesRef">
    <div class="grid grid-cols-[auto_auto] gap-2">
      <template v-for="weekendWorkingTime in weekendWorkingTimes">
        <div :class="['col-span-1 text-right font-bold', weekendWorkingTime.isCurrent ? 'text-red-300' : '']">{{ weekendWorkingTime.label }}</div>
        <div class="col-span-1 text-left">
          {{ weekendWorkingTime.workingTimes }}
        </div>
      </template>
    </div>
  </Popover>
</template>

<script setup lang="ts">
import _ from 'lodash';

export interface Props {
  weekdays?: {
    isActive: boolean;
    weekday: number;
    openTime: number;
    closeTime: number;
  }[];
}

const props = withDefaults(defineProps<Props>(), {
  openTime: 0,
  closeTime: 0,
  weekdays: () => [],
});

const { t } = useI18n();

const weekdaySchedulesRef = useTemplateRef('weekdaySchedulesRef');

const currentWeekday = props.weekdays.find((weekday) => {
  return weekday.weekday === new Date().getDay();
});

const currentWeekdayWorkingTime = computed(() => {
  if (! currentWeekday?.isActive) {
    return t('statuses.closed');
  }

  return getFormattedTimeRange(currentWeekday.openTime, currentWeekday.closeTime);
});

const weekendWorkingTimes = computed(() => {
  return _.map(props.weekdays, (weekday) => ({
    isCurrent: weekday.weekday === currentWeekday?.weekday,
    label: t(`weekdays.${weekday.weekday}`),
    workingTimes: weekday.isActive
      ? getFormattedTimeRange(weekday.openTime, weekday.closeTime)
      : t('statuses.closed'),
  }));
});
</script>
