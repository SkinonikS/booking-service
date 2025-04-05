<template>
  <PageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #content>
          <DataTable :loading="status === 'pending'" :value="bookingProviders">
            <Column name="name" :header="$t('common.name')">
              <template #body="{ data: item }">
                <div class="flex flex-col gap-2">
                  <p>{{ item.name }}</p>
                </div>
              </template>
            </Column>
            <Column name="actions" body-style="text-align: right">
              <template #body="{ data: item }: { data: BookingProvider }">
                <Button v-tooltip.top="$t('common.view')" v-wave text rounded @click="viewBookingProvider(item.id)">
                  <template #icon>
                    <Icon name="mdi:eye" />
                  </template>
                </Button>
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { gql } from 'nuxt-graphql-request/utils';
import type { BookingProvider } from '~/types/models';

export interface GraphqlResponse {
  me: {
    bookingProviders: Pick<BookingProvider, 'id' | 'name'>[];
  };
}

definePageMeta({
  layout: 'default',
});

const localeRoute = useLocaleRoute();
const { $graphql } = useNuxtApp();

const { data: bookingProviders, status } = await useAsyncData(async () => {
  const data = await $graphql.default.request<GraphqlResponse>(gql`
    query bookingProviders {
      me {
        bookingProviders {
          id
          name
        }
      }
    }
  `);

  return data.me.bookingProviders;
});

const viewBookingProvider = async (bookingProviderId: string) => {
  const localeRoutePath = localeRoute({
    name: 'management-bookingProviderId',
    params: { bookingProviderId },
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
