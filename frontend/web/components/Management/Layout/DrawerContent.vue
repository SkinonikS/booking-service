<template>
  <div :class="['relative flex flex-col h-full', props.class]" :style="props.style">
    <div class="overflow-y-auto">
      <ul class="p-4">
        <li v-for="link in sidebarLinks">
          <template v-if="! link.hasChildrens">
            <CommonDrawerLink :to="link.to" :icon="link.icon" :title="link.title" />
          </template>
          <template v-else>
            <CommonDrawerNestedLink :list-padding="false" :icon="link.icon" :title="link.title" :links="link.subLinks" :root-active="$route.name?.toString().startsWith(link.root) ?? false" />
          </template>
        </li>
      </ul>
    </div>
    <div class="mt-auto">
      <hr class="border-t border-0 border-surface-200 dark:border-surface-700">
      <div class="p-4">
        <CommonDrawerNestedLink :list-padding="false" icon="mdi:account" title="User" :links="userLinks">
          <template #sublinks="{ links }">
            <li v-for="link in links">
              <CommonDrawerLink :to="link.to" :icon="link.icon" :title="link.title" />
            </li>
            <li>
              <a v-wave class="flex items-center gap-4 cursor-pointer p-4 rounded text-red-700 hover:bg-surface-100 dark:hover:bg-surface-800 duration-150 transition-colors" @click="logout()">
                <Icon name="mdi:logout" size="1.5rem" />
                <span class="font-medium">{{ $t('common.logout') }}</span>
              </a>
            </li>
          </template>
        </CommonDrawerNestedLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SidebarLink, SidebarLinkWithChildrens, UserLink } from '~/types/components';

export interface Props {
  class?: string;
  style?: string;
}

const { logout } = useOidcAuth();
const localeRoute = useLocaleRoute();

const sidebarLinks: (SidebarLink | SidebarLinkWithChildrens)[] = [
  {
    hasChildrens: false,
    title: 'Bookings',
    to: localeRoute({ name: 'management-bookingProviderId-bookings' }) ?? '/',
    icon: 'mdi:calendar',
  },
  {
    hasChildrens: false,
    title: 'Services',
    to: localeRoute({ name: 'management-bookingProviderId-services' }) ?? '/',
    icon: 'mdi:cog',
  },
  {
    hasChildrens: false,
    title: 'Weekday Schedule',
    to: localeRoute({ name: 'management-bookingProviderId-weekday-schedules' }) ?? '/',
    icon: 'mdi:calendar-week',
  },
  {
    hasChildrens: false,
    title: 'General Information',
    to: localeRoute({ name: 'management-bookingProviderId-settings-general' }) ?? '/',
    icon: 'mdi:information',
  },
];

const userLinks: UserLink[] = [
  {
    title: 'Exit management',
    to: localeRoute({ name: 'index' }) ?? '/',
    icon: 'mdi:logout',
  },
];

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
});
</script>
