<template>
  <BaseLayoutDefaultHeader class="lg:pl-[var(--sidebar-width)]" :title="appName" />
</template>

<script setup lang="ts">
export interface Props {
  class?: string;
  style?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
});

const { appName } = useAppConfig();
</script>
