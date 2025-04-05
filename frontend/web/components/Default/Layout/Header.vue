<template>
  <header :class="['shadow-[0px_2px_12px_0px_rgba(0,0,0,0.2)] h-full z-1 dark:border-stone-800 border-stone-300 border-b', props.class]" :style="props.style">
    <div class="container mx-auto p-4 flex flex-row items-center justify-between h-full">
      <NuxtLink href="/" class="text-2xl font-bold text-primary">
        {{ appName }}
      </NuxtLink>
      <DefaultLayoutDrawerButton />
    </div>
  </header>
</template>

<script setup lang="ts">
export interface Props {
  class?: string;
  style?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
});

const { appName } = useAppConfig();
</script>
