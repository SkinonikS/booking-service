<template>
  <div class="flex flex-row-reverse gap-2">
    <slot name="after" />
    <Button v-wave :label="props.primaryActionTokenLabel" :disabled="! props.disabled" :loading="props.loading" @click="emit('submit')">
      <template #icon>
        <Icon name="mdi:update" />
      </template>
    </Button>
    <Button v-if="props.showReset" v-wave text :label="props.resetActionTokenLabel" severity="danger" :disabled="! props.disabled || props.loading" @click="emit('reset')">
      <template #icon>
        <Icon name="mdi:history" />
      </template>
    </Button>
    <slot name="before" />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  resetActionTokenLabel?: string;
  primaryActionTokenLabel?: string;
  showReset?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export interface Emits {
  submit: [];
  reset: [];
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  showReset: true,
  primaryActionTokenLabel: () => useI18n().t('common.save'),
  resetActionTokenLabel: () => useI18n().t('common.reset'),
});

const emit = defineEmits<Emits>();
</script>
