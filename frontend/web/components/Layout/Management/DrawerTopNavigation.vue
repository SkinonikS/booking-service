<template>
  <li v-for="link in links">
    <BaseDrawerLink :label="$t(link.label)" :icon="link.icon" :to="link.to" />
  </li>
</template>

<script setup lang="ts">
const localeRoute = useLocaleRoute();

const links = [
  {
    class: 'text-surface-700 dark:text-surface-0',
    label: 'navigation.managementMenu.bookings',
    to: localeRoute({ name: 'management-bookingProviderId-bookings' }) ?? '/',
    icon: 'mdi:calendar',
  },
  {
    class: 'text-surface-700 dark:text-surface-0',
    label: 'navigation.managementMenu.services',
    to: localeRoute({ name: 'management-bookingProviderId-services' }) ?? '/',
    icon: 'mdi:cog',
  },
  {
    class: 'text-surface-700 dark:text-surface-0',
    label: 'navigation.managementMenu.weekdaySchedules',
    to: localeRoute({ name: 'management-bookingProviderId-weekday-schedules' }) ?? '/',
    icon: 'mdi:calendar-week',
  },
  {
    class: 'text-surface-700 dark:text-surface-0',
    label: 'navigation.managementMenu.general',
    to: localeRoute({ name: 'management-bookingProviderId-settings-general' }) ?? '/',
    icon: 'mdi:information',
  },
];
</script>
