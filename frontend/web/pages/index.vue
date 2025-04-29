<template>
  <section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
    <HomePageQuickSearchSection />
  </section>
  <section class="py-16 bg-gray-100 dark:bg-gray-500">
    <HomePageCategoriesSection />
  </section>
  <section class="py-16 px-4">
    <HomePageBookingProvidersSection />
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'HomePage',
});
</script>
