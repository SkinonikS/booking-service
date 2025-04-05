<template>
  <Card v-for="item in categories" class="hover:shadow-lg transition-shadow cursor-pointer">
    <template #content>
      <div class="flex flex-col items-center justify-center">
        <Icon name="mdi:shape-plus" size="3rem" class="text-primary" />
        <h3 class="font-semibold text-lg">{{ item.name }}</h3>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import type { Category } from '~/types/models';

interface GraphqlResponse {
  randomCategories: Pick<Category, 'id' | 'name'>[];
}

const { $graphql } = useNuxtApp();

const { data: categories } = await useAsyncData(async () => {
  const { randomCategories } = await $graphql.default.request<GraphqlResponse>(gql`
    query {
      randomCategories(limit: 6) {
        id
        name
      }
    }
  `);

  return randomCategories;
});
</script>
