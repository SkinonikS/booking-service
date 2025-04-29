<template>
  <Button v-wave text @click="emit('click')">
    <Icon name="mdi:menu" size="1.5rem" />
  </Button>
</template>

<script setup lang="ts">
export interface Emits {
  click: [];
}

const emit = defineEmits<Emits>();
</script>
