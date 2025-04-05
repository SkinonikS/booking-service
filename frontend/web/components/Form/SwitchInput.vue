<template>
  <div :class="['flex flex-col gap-2', props.class]" :style="props.style">
    <div class="flex flex-row items-center gap-2">
      <ToggleSwitch :id="props.name" v-model="value" :invalid="!! errorMessage" :disabled="props.disabled" name="closingTime" />
      <label :for="props.name">{{ props.label }}</label>
    </div>
    <Message v-if="errorMessage" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  class?: string;
  style?: string;
  label: string;
  name: string;
  disabled?: boolean;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
  disabled: false,
  modelValue: undefined,
});

const { value, errorMessage } = useField<boolean>(() => props.name, undefined, {
  syncVModel: true,
});
</script>
