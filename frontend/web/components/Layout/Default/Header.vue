<template>
  <BaseLayoutDefaultHeader class="row-span-1" :title="appName">
    <template #button>
      <BaseLayoutDrawerToggleButton @click="drawerStore.toggle()"></BaseLayoutDrawerToggleButton>
    </template>
  </BaseLayoutDefaultHeader>
</template>

<script setup lang="ts">
const { appName } = useAppConfig();
const drawerStore = useDefaultDrawer();
</script>
