<template>
  <NuxtPwaManifest />
  <NuxtLoadingIndicator :throttle="0" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { appName } = useAppConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${appName}` : appName;
  },
  description: 'Find and Book Amazing Experiences. Explore our features and services.',
});
</script>
