<template>
  <div class="flex flex-col gap-4">
    <template v-if="props.items.length > 0">
      <Paginator v-if="props.visiblePaginators" v-model:first="offset" :class="paginatorClasses" :total-records="total" :rows="perPage" always-show />
      <slot name="content" :items="props.items" />
      <Paginator v-if="props.visiblePaginators" v-model:first="offset" :class="paginatorClasses" :total-records="total" :rows="perPage" always-show />
    </template>
    <template v-else>
      <slot name="empty" />
    </template>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  disabled?: boolean;
  visiblePaginators?: boolean;
  total: number;
  perPage: number;
  items?: unknown[];
}

const offset = defineModel<number>('offset', {
  required: true,
});

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  visiblePaginators: false,
  items: () => [],
});

const paginatorClasses = computed(() => ({
  'paginator--disabled': props.disabled,
}));
</script>
