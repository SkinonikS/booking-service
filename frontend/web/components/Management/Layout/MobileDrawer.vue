<template>
  <Drawer v-model:visible="drawerStore.isVisible.value" position="full">
    <ManagementLayoutDrawerContent />
  </Drawer>
</template>

<script setup lang="ts">
const drawerStore = storeToRefs(useDefaultDrawer());
</script>
