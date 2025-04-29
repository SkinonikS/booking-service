<template>
  <template v-if="loggedIn">
    <BaseDrawerNestedNavigation :label="(user?.userInfo?.name as string) ?? '-'" icon="mdi:account">
      <template #links>
        <li v-for="link in links">
          <BaseDrawerLink :label="$t(link.label)" :icon="link.icon" :to="link.to" :class="link.class" />
        </li>
      </template>
    </BaseDrawerNestedNavigation>
  </template>
  <template v-else>
    <Button v-wave :label="$t('actions.login')" fluid @click="startLogin()">
      <template #icon>
        <Icon name="mdi:login" />
      </template>
    </Button>
  </template>
</template>

<script setup lang="ts">
const drawerStore = useDefaultDrawer();
const { user, loggedIn, logout, login } = useOidcAuth();
const localeRoute = useLocaleRoute();

const startLogin = () => {
  login();
  drawerStore.close();
};

const links = computed(() => {
  const links = [
    {
      class: 'text-surface-700 dark:text-surface-0',
      label: 'navigation.mainMenu.bookings',
      icon: 'mdi:list-box',
      to: localeRoute({ name: 'me-bookings' }) ?? '/',
    },
    {
      class: 'text-red-700',
      label: 'navigation.mainMenu.logout',
      icon: 'mdi:logout',
      to: () => {
        logout();
        drawerStore.close();
      },
    },
  ];

  if (user.value?.userInfo?.['custom:is_verified'] === 'true') {
    links.unshift({
      class: 'text-surface-700 dark:text-surface-0',
      label: 'navigation.mainMenu.management',
      icon: 'mdi:cog',
      to: localeRoute({ name: 'management' }) ?? '/',
    });
  }

  return links;
});
</script>
