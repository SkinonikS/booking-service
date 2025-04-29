<template>
  <div class="container mx-auto text-center px-6">
    <h1 class="text-4xl font-bold mb-4">{{ $t('pages.homepage.title') }}</h1>
    <p class="text-xl mb-8">{{ $t('pages.homepage.description') }}</p>
    <div class="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-start gap-4">
        <Select v-model="category" :options="categories" :loading="status === 'pending'" fluid option-label="label" option-value="value" class="lg:col-span-1" :placeholder="$t('common.category')"/>
        <DatePicker v-model="date" class="lg:col-span-1" :placeholder="$t('common.date')" :min-date="new Date()" show-icon>
          <template #dropdownicon>
            <Icon name="mdi:calendar" />
          </template>
        </DatePicker>
        <Button v-wave :disabled="canSearch" class="sm:col-span-2 lg:col-span-1" :label="$t('common.search')" @click="quickSearch">
          <template #icon>
            <Icon name="mdi:magnify" />
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GET_CATEGORIES } from '~/graphql/home-page';
import { graphql } from '~/utils/graphql';

const { $graphql } = useNuxtApp();
const searchStore = storeToRefs(useSearchStore());
const localeRoute = useLocaleRoute();

const { data, status } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_CATEGORIES));
}, {
  server: false,
  lazy: true,
});

const category = ref<string>('');
const date = ref<Date | null>(null);

const canSearch = computed(() => {
  return ! category.value || ! date.value || status.value === 'pending';
});

const categories = computed(() => {
  if (! data.value?.categories) {
    return [];
  }

  return data.value.categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
});

const quickSearch = async () => {
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
