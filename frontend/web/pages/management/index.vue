<template>
  <BasePageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #content>
          <DataTable :loading="status === 'pending'" :value="data?.me?.bookingProviders ?? []">
            <Column name="name" :header="$t('common.name')">
              <template #body="{ data: item }">
                <div class="flex flex-col gap-2">
                  <p>{{ item.name }}</p>
                </div>
              </template>
            </Column>
            <Column name="email" header="Email">
              <template #body="{ data: item }">
                <div class="flex flex-col gap-2">
                  <p>{{ item.email }}</p>
                </div>
              </template>
            </Column>
            <Column name="phone" header="Phone">
              <template #body="{ data: item }">
                <div class="flex flex-col gap-2">
                  <p>{{ item.phone }}</p>
                </div>
              </template>
            </Column>
            <Column name="actions" body-style="text-align: right">
              <template #body="{ data: item }">
                <Button v-tooltip.top="$t('common.view')" v-wave text rounded @click="viewBookingProvider(item.id)">
                  <template #icon>
                    <Icon name="mdi:eye" />
                  </template>
                </Button>
              </template>
            </Column>
            <template #empty>
              <div class="text-center">No booking providers found.</div>
            </template>
          </DataTable>
        </template>
      </Card>
    </div>
  </BasePageContainer>
</template>

<script setup lang="ts">
import { graphql } from '~/utils/graphql';
import { GET_BOOKING_PROVIDERS } from '~/graphql/management/home-page';

definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'My booking providers',
});

const localeRoute = useLocaleRoute();
const { $graphql } = useNuxtApp();

const { data, status } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_BOOKING_PROVIDERS));
});

const viewBookingProvider = async (bookingProviderId: string) => {
  const localeRoutePath = localeRoute({
    name: 'management-bookingProviderId',
    params: { bookingProviderId },
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
