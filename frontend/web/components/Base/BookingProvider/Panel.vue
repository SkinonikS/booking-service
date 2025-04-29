<template>
  <Card :pt="{ body: { class: 'h-full' }, content: { class: 'h-full' } }" :class="['overflow-hidden', props.class]" :style="props.style">
    <template #header>
      <template v-if="props.cover">
        <BaseCommonImage width="100%" height="300px" object-fit="cover" :aspect-ratio="1" object-position="top" :src="props.cover" />
      </template>
      <template v-else>
        <div class="flex flex-col justify-center items-center h-[300px]">
          <Icon name="mdi:note-off-outline" size="4rem" />
          <div class="text-sm">{{ $t('common.noImageAvailable') }}</div>
        </div>
      </template>
    </template>
    <template #title>
      <h2 class="text-xl font-semibold">{{ props.title }}</h2>
    </template>
    <template #content>
      <div class="flex flex-col gap-2">
        <div class="grid grid-cols-[auto_1fr] text-sm gap-2">
          <span v-tooltip.top="$t('common.category')">
            <Icon name="mdi:shape-plus" size="1.25rem"  />
          </span>{{ props.category }}
        </div>
        <div class="grid grid-cols-[auto_1fr] text-sm gap-2">
          <span v-tooltip.top="$t('common.address')">
            <Icon name="mdi:map-marker" size="1.25rem" />
          </span>{{ props.address }}
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex flex-row gap-2">
        <Button v-wave class="flex-1" :label="$t('common.view')" @click="emit('click')">
          <template #icon>
            <Icon name="mdi:eye" />
          </template>
        </Button>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
export interface Props {
  title: string;
  address: string;
  category: string;
  cover?: string;
  class?: string;
  style?: string;
}

export interface Emits {
  click: [];
}

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  cover: undefined,
  class: '',
  style: '',
});
</script>
