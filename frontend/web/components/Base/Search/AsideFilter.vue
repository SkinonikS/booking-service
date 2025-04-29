<template>
  <aside>
    <Card>
      <template #title>
        <h2 class="text-lg font-semibold">
          {{ $t('common.filter') }}
        </h2>
      </template>
      <template #subtitle>
        {{ $t('common.filterDescription') }}
      </template>
      <template #content>
        <slot name="form" />
      </template>
      <template #footer>
        <div class="flex flex-row gap-2">
          <Button v-wave class="grow" :label="$t('common.search')" @click="emit('search')">
            <template #icon>
              <Icon name="mdi:filter" />
            </template>
          </Button>
          <Button v-wave v-tooltip.top="$t('common.resetFilter')" severity="danger" @click="emit('reset')">
            <template #icon>
              <Icon name="mdi:filter-off" />
            </template>
          </Button>
        </div>
      </template>
    </Card>
  </aside>
</template>

<script setup lang="ts">
export interface Emit {
  search: [];
  reset: [];
}

const emit = defineEmits<Emit>();
</script>
