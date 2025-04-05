<template>
  <Drawer v-model:visible="drawerStore.isVisible" :header="appConfig.appName" :position="position">
    <div class="overflow-y-auto">
      <ul class="overflow-hidden">
        <li v-for="link in links">
          <NuxtLinkLocale v-wave :to="link.to" active-class="bg-primary/10" class="flex items-center gap-4 cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors" @click="drawerStore.close">
            <Icon :name="link.icon" size="1.5rem" />
            <span class="font-medium">{{ $t(link.label) }}</span>
          </NuxtLinkLocale>
        </li>
      </ul>
    </div>
    <template #footer>
      <Divider />
      <DefaultDrawerUser />
    </template>
  </Drawer>
</template>

<script setup lang="ts">
const bp = useAppBreakpoints();
const greaterOrEqualMd = bp.greaterOrEqual('md');

const appConfig = useAppConfig();
const drawerStore = useDefaultDrawer();

const position = computed(() => {
  return greaterOrEqualMd.value ? 'right' : 'full';
});

const links = computed(() => [
  {
    label: 'layouts.default.navigation.homepage',
    icon: 'mdi:house',
    to: { name: 'index' },
  },
  {
    label: 'layouts.default.navigation.advancedSearch',
    icon: 'mdi:magnify',
    to: { name: 'search' },
  },
]);
</script>
