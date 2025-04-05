<template>
  <aside>
    <Card>
      <template #content>
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <label for="categories">{{ $t('common.categories') }}</label>
            <MultiSelect id="categories" v-model="searchStore.categories" :options="categoryOptions" filter display="chip" :loading="status === 'pending'" option-label="label" option-value="value" fluid />
          </div>
          <div class="flex flex-col gap-2">
            <label for="date">{{ $t('common.date') }}</label>
            <DatePicker id="date" v-model="(searchStore.date as unknown as Date | null)" :loading="status === 'pending'" option-label="label" option-value="value" fluid />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex flex-row gap-2">
          <Button v-wave class="grow" :label="$t('common.search')" @click="requestSearch">
            <template #icon>
              <Icon name="mdi:filter" />
            </template>
          </Button>
          <Button v-wave v-tooltip.top="$t('common.resetFilter')" severity="danger" @click="reset">
            <template #icon>
              <Icon name="mdi:filter-off" />
            </template>
          </Button>
        </div>
      </template>
    </Card>
  </aside>
</template>

<script setup lang="ts">
import { gql } from 'graphql-request';
import type { Category } from '~/types/models';

export interface GraphqlResponse {
  categories: Pick<Category, 'id' | 'name'>[];
}

export interface Emit {
  requestSearch: [];
}

const emit = defineEmits<Emit>();

const { $graphql } = useNuxtApp();
const searchStore = storeToRefs(useSearchStore());

const { data, status } = await useAsyncData(() => {
  return $graphql.default.request<GraphqlResponse>(gql`
    query categories {
      categories {
        id
        name
      }
    }
  `);
}, {
  server: false,
  lazy: true,
});

const categoryOptions = computed(() => {
  if (! data.value) {
    return [];
  }

  return data.value.categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
});

const reset = () => {
  searchStore.categories.value = [];
  searchStore.date.value = null;

  requestSearch();
};

const requestSearch = () => emit('requestSearch');
</script>
