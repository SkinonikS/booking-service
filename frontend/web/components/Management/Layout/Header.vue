<template>
  <header :class="['lg:pl-[var(--sidebar-width)] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.2)] h-[var(--header-height)] dark:border-stone-800 border-stone-300 border-b', props.class]" :style="props.style">
    <div class="container mx-auto p-4 flex flex-row items-center justify-between h-full">
      <NuxtLink to="/management" class="text-2xl font-bold text-primary">
        {{ appName }}
      </NuxtLink>
      <DefaultLayoutDrawerButton class="lg:hidden" />
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
