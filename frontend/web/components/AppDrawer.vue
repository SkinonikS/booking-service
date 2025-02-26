<template>
  <Button v-wave text @click="openDrawer">
    <Icon name="mdi:menu" class="h-6 w-6" />
  </Button>
  <Drawer v-model:visible="isVisible" :header="appConfig.appName" :position="position">
    <div class="flex flex-col">
      <div class="overflow-y-auto">
        <ul class="overflow-hidden">
          <li v-for="link in links">
            <NuxtLinkLocale v-wave :to="link.to" active-class="bg-primary/10" class="flex items-center gap-4 cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors" @click="closeDrawer">
              <Icon :name="link.icon" size="1.5rem" />
              <span class="font-medium">{{ $t(link.label) }}</span>
            </NuxtLinkLocale>
          </li>
        </ul>
      </div>
    </div>
    <template #footer>
      <Divider />
      <DrawerUser @click="closeDrawer" />
    </template>
  </Drawer>
</template>

<script setup lang="ts">
const bp = useAppBreakpoints();
const greaterOrEqualMd = bp.greaterOrEqual('md');

const appConfig = useAppConfig();

const isVisible = ref(false);

const links = computed(() => [
  {
    label: 'navigation.homepage',
    icon: 'mdi:house',
    to: { name: 'index' },
  },
  {
    label: 'navigation.advancedSearch',
    icon: 'mdi:magnify',
    to: { name: 'search' },
  },
]);

const position = computed(() => {
  return greaterOrEqualMd.value ? 'right' : 'full';
});

const openDrawer = () => {
  isVisible.value = true;
};

const closeDrawer = () => {
  isVisible.value = false;
};
</script>
