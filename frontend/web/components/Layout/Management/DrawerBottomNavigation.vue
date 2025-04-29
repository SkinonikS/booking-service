<template>
  <BaseDrawerNestedNavigation icon="mdi:account" :label="user?.userInfo?.name ?? '-'">
    <template #links>
      <li v-for="link in links">
        <BaseDrawerLink :to="link.to" :icon="link.icon" :label="link.label" :class="link.class" />
      </li>
    </template>
  </BaseDrawerNestedNavigation>
</template>

<script setup lang="ts">
const { user, logout } = useOidcAuth();
const localeRoute = useLocaleRoute();

const links = [
  {
    class: 'text-surface-700 dark:text-surface-0',
    label: 'Back to Home',
    to: localeRoute({ name: 'index' }) ?? '/',
    icon: 'mdi:home',
  },
  {
    class: 'text-red-700',
    label: 'Logout',
    to: () => logout(),
    icon: 'mdi:logout',
  },
];
</script>
