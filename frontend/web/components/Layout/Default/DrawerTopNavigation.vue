<template>
  <li v-for="link in links">
    <BaseDrawerLink :label="$t(link.label)" :icon="link.icon" :to="link.to" />
  </li>
</template>

<script setup lang="ts">
const localeRoute = useLocaleRoute();

const links = computed(() => [
  {
    label: 'drawer.navigation.homepage',
    icon: 'mdi:house',
    to: localeRoute({ name: 'index' }),
  },
  {
    label: 'drawer.navigation.advancedSearch',
    icon: 'mdi:magnify',
    to: localeRoute({ name: 'search' }),
  },
]);
</script>
