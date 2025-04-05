<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-start gap-4">
    <Select v-model="category" :options="categoryOptions" :loading="status === 'pending'" option-label="label" option-value="value" class="lg:col-span-1" :placeholder="$t('common.category')" />
    <DatePicker v-model="date" class="lg:col-span-1" :placeholder="$t('common.date')" :min-date="new Date()" show-icon>
      <template #dropdownicon>
        <Icon name="mdi:calendar" />
      </template>
    </DatePicker>
    <Button v-wave :disabled="canSearch" class="sm:col-span-2 lg:col-span-1" :label="$t('common.search')" @click="search">
      <template #icon>
        <Icon name="mdi:magnify" />
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import type { Category } from '~/types/models';

interface GraphqlResponse {
  categories: Pick<Category, 'id' | 'name'>[];
}

const { $graphql } = useNuxtApp();
const searchStore = storeToRefs(useSearchStore());
const localeRoute = useLocaleRoute();

const { data: categories, status } = await useAsyncData(async () => {
  const { categories } = await $graphql.default.request<GraphqlResponse>(gql`
    query categories {
      categories {
        id
        name
      }
    }
  `);

  return categories;
}, {
  server: false,
  lazy: true,
});

const category = ref<string>('');
const date = ref<Date | null>(null);
const canSearch = computed(() => {
  return ! category.value || ! date.value || status.value === 'pending';
});

const categoryOptions = computed(() => {
  if (! categories.value) {
    return [];
  }

  return categories.value.map((category) => ({
    label: category.name,
    value: category.id,
  }));
});

const search = async () => {
  if (canSearch.value) {
    return;
  }

  searchStore.date.value = date.value;
  searchStore.categories.value = [category.value];

  const localeRoutePath = localeRoute({
    name: 'search',
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
