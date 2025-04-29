<template>
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('public.homepage.categories') }}</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <BaseCategoryPanel v-for="category in data?.randomCategories ?? []" :label="category.name" class="col-span-1" @click="filterByCategory(category.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GET_RANDOM_CATEGORIES } from '~/graphql/home-page';
import { graphql } from '~/utils/graphql';

const { $graphql } = useNuxtApp();
const localeRoute = useLocaleRoute();
const searchStore = storeToRefs(useSearchStore());

const { data } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_RANDOM_CATEGORIES));
});

const filterByCategory = async (categoryId: string) => {
  searchStore.categories.value = [categoryId];

  const localeRoutePath = localeRoute({
    name: 'search',
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
