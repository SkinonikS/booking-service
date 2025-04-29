<template>
  <Drawer v-model:visible="drawerStore.isVisible.value" position="full">
    <LayoutManagementDrawerContent />
  </Drawer>
</template>

<script setup lang="ts">
const drawerStore = storeToRefs(useDefaultDrawer());
</script>
