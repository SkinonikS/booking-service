<template>
  <li v-for="link in links">
    <BaseDrawerLink :label="$t(link.label)" :icon="link.icon" :to="link.to" />
  </li>
</template>

<script setup lang="ts">
const localeRoute = useLocaleRoute();

const links = computed(() => [
  {
    label: 'navigation.mainMenu.homepage',
    icon: 'mdi:house',
    to: localeRoute({ name: 'index' }) ?? '/',
  },
  {
    label: 'navigation.mainMenu.search',
    icon: 'mdi:magnify',
    to: localeRoute({ name: 'search' }) ?? '/',
  },
]);
</script>
