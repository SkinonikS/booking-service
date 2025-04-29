<template>
  <div class="flex flex-col gap-4">
    <Paginator v-if="props.visiblePaginators" v-model:first="offset" :class="paginatorClasses" :total-records="total" :rows="perPage" always-show />
    <slot name="content"/>
    <Paginator v-if="props.visiblePaginators" v-model:first="offset" :class="paginatorClasses" :total-records="total" :rows="perPage" always-show />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  disabled?: boolean;
  visiblePaginators?: boolean;
  total: number;
  perPage: number;
}

const offset = defineModel<number>('offset', {
  required: true,
});

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  visiblePaginators: false,
});

const paginatorClasses = computed(() => ({
  'paginator--disabled': props.disabled,
}));
</script>
