<template>
  <Drawer v-model:visible="modelValue" :header="props.header" :position="props.position">
    <div class="overflow-y-auto">
      <ul class="overflow-hidden">
        <slot name="top-navigation" />
      </ul>
    </div>
    <template #footer>
      <Divider />
      <slot name="bottom-navigation" />
    </template>
  </Drawer>
</template>

<script setup lang="ts">
export interface Props {
  header: string;
  position?: 'right' | 'full';
}

const modelValue = defineModel<boolean>({
  default: false,
});

const props = withDefaults(defineProps<Props>(), {
  position: 'right',
});
</script>
