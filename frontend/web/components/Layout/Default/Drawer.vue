<template>
  <BaseLayoutDefaultDrawer v-model="drawerStore.isVisible" :header="appName" :position="drawerPosition">
    <template #top-navigation>
      <LayoutDefaultDrawerTopNavigation />
    </template>
    <template #bottom-navigation>
      <LayoutDefaultDrawerBottomNavigation />
    </template>
  </BaseLayoutDefaultDrawer>
</template>

<script setup lang="ts">
const bp = useAppBreakpoints();
const greaterOrEqualMd = bp.greaterOrEqual('md');

const { appName } = useAppConfig();
const drawerStore = useDefaultDrawer();

const drawerPosition = computed(() => {
  return greaterOrEqualMd.value ? 'right' : 'full';
});
</script>
