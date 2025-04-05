<template>
  <div :class="['flex flex-col gap-2', props.class]" :style="props.style">
    <label :for="props.name">{{ props.label }}</label>
    <div class="flex flex-col gap-1">
      <InputText :id="props.name" v-model="value" :invalid="!! errorMessage" :disabled="props.disabled" />
      <Message v-if="errorMessage" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  class?: string;
  style?: string;
  label: string;
  name: string;
  disabled?: boolean;
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  class: '',
  style: '',
  modelValue: undefined,
});

const { value, errorMessage } = useField<string>(() => props.name, undefined, {
  syncVModel: true,
});
</script>
