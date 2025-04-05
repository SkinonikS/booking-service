<template>
  <Card>
    <template #title>{{ $t('pages.bookingProvidersShow.contactsTitle') }}</template>
    <template #subtitle>{{ $t('pages.bookingProvidersShow.contactsDescription') }}</template>
    <template #content>
      <ul>
        <li v-if="props.email" v-tooltip.top="$t('common.phone')" class="flex items-center gap-4 p-4">
          <Icon name="mdi:phone" size="1.5rem" />
          <span>{{ props.phone }}</span>
        </li>
        <li v-if="props.email" v-tooltip.top="$t('common.email')" class="flex items-center gap-4 p-4">
          <Icon name="mdi:email" size="1.5rem" />
          <span>{{ props.email }}</span>
        </li>
        <li v-if="props.website" v-tooltip.top="$t('common.website')" class="flex items-center gap-4 p-4">
          <Icon name="mdi:web" size="1.5rem" />
          <span>{{ props.website }}</span>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script setup lang="ts">
export interface Props {
  phone?: string;
  email?: string;
  website?: string;
}

const props = withDefaults(defineProps<Props>(), {
  phone: undefined,
  email: undefined,
  website: undefined,
});
</script>
