<template>
  <Card>
    <template #title>
      <slot name="title" />
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
    <template #content>
      <ul>
        <li v-if="props.phone" class="grid grid-cols-[auto_1fr] gap-4 p-4">
          <div v-tooltip.top="$t('labels.phone')">
            <Icon name="mdi:phone" size="1.5rem" />
          </div>
          <span>{{ props.phone }}</span>
        </li>
        <li v-if="props.email" class="grid grid-cols-[auto_1fr] gap-4 p-4">
          <div v-tooltip.top="$t('labels.email')">
            <Icon name="mdi:email" size="1.5rem" />
          </div>
          <span>{{ props.email }}</span>
        </li>
        <li v-if="props.website" class="grid grid-cols-[auto_1fr] gap-4 p-4">
          <div v-tooltip.top="$t('labels.website')">
            <Icon name="mdi:web" size="1.5rem" />
          </div>
          <a :href="props.website" target="_blank" class="text-blue-400" rel="noopener noreferrer">{{ props.website }}</a>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script setup lang="ts">
export interface Props {
  phone?: string;
  email?: string;
  website?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  phone: undefined,
  email: undefined,
  website: undefined,
});
</script>
