<template>
  <Button v-wave text :class="props.class" :style="props.style" @click="defaultDrawer.toggle">
    <Icon name="mdi:menu" size="1.5rem" />
  </Button>
</template>

<script setup lang="ts">
export interface Props {
  class?: string;
  style?: string;
}

const defaultDrawer = useDefaultDrawer();

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
});
</script>
