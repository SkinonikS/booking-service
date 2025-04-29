<template>
  <BasePageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #content>
          <DataTable :loading="status === 'pending'" :value="data?.me?.bookingProviders ?? []">
            <Column name="name" :header="$t('labels.name')">
              <template #body="{ data: item }">
                <div class="flex flex-col gap-2">
                  <p>{{ item.name }}</p>
                </div>
              </template>
            </Column>
            <Column name="email" :header="$t('labels.email')">
              <template #body="{ data: item }">
                <div class="flex flex-col gap-2">
                  <p>{{ item.email }}</p>
                </div>
              </template>
            </Column>
            <Column name="phone" :header="$t('labels.phone')">
              <template #body="{ data: item }">
                <div class="flex flex-col gap-2">
                  <p>{{ item.phone }}</p>
                </div>
              </template>
            </Column>
            <Column name="actions" body-style="text-align: right">
              <template #body="{ data: item }">
                <Button v-tooltip.top="$t('actions.view')" v-wave text rounded @click="viewBookingProvider(item.id)">
                  <template #icon>
                    <Icon name="mdi:eye" />
                  </template>
                </Button>
              </template>
            </Column>
            <template #empty>
              <div class="text-center">{{ $t('management.bookingProviders.noResults.title') }}</div>
            </template>
          </DataTable>
        </template>
      </Card>
    </div>
  </BasePageContainer>
</template>

<script setup lang="ts">
import { GET_BOOKING_PROVIDERS } from '~/graphql/management/home-page';
import { graphql } from '~/utils/graphql';

definePageMeta({
  layout: 'default',
  middleware: ['is-verified'],
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
