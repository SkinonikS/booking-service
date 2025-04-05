<template>
  <template v-if="loggedIn">
    <div class="overflow-y-auto">
      <ul>
        <li>
          <div
            v-wave
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-slidedown',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-slideup'
            }"
            class="p-4 gap-4 flex items-center text-surface-500 dark:text-surface-400 cursor-pointer rounded"
          >
            <Icon name="mdi:account" size="1.5rem" />
            <span class="font-medium flex-grow">{{ user?.userInfo?.name ?? 'N/A' }}</span>
            <Icon name="mdi:chevron-down" size="1.5rem" />
          </div>
          <ul class="overflow-hidden hidden">
            <li>
              <NuxtLinkLocale v-wave active-class="bg-primary/10" class="flex items-center gap-4 cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors" :to="{ name: 'me-bookings' }">
                <Icon name="mdi:list-box" size="1.5rem" />
                <span class="font-medium">{{ $t('common.bookings') }}</span>
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale v-wave active-class="bg-primary/10" class="flex items-center gap-4 cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors" :to="{ name: 'management' }">
                <Icon name="mdi:list-box" size="1.5rem" />
                <span class="font-medium">{{ $t('layouts.default.navigation.management') }}</span>
              </NuxtLinkLocale>
            </li>
            <li>
              <a v-wave class="flex items-center gap-4 cursor-pointer p-4 rounded text-red-700 hover:bg-surface-100 dark:hover:bg-surface-800 duration-150 transition-colors" @click="logout">
                <Icon name="mdi:logout" size="1.5rem" />
                <span class="font-medium">{{ $t('common.logout') }}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  <template v-else>
    <Button v-wave label="Login" fluid @click="login">
      <template #icon>
        <Icon name="mdi:login" />
      </template>
    </Button>
  </template>
</template>

<script setup lang="ts">
const defaultDrawer = useDefaultDrawer();
const { loggedIn, user, logout: authLogout, login: authLogin } = useOidcAuth();

const login = () => {
  authLogin();
  defaultDrawer.close();
};

const logout = () => {
  authLogout();
  defaultDrawer.close();
};
</script>
