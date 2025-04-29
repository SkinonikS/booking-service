<template>
  <BasePageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.services.title') }}</template>
        <template #subtitle>{{ $t('management.services.description') }}</template>
        <template #content>
          <DataTable :value="data?.bookingProvider?.services ?? []" :loading="status === 'pending'">
            <Column field="name" :header="$t('labels.name')">
              <template #body="{ data: item }">
                <span>{{ item.name }}</span>
              </template>
            </Column>
            <Column field="description" :header="$t('labels.description')">
              <template #body="{ data: item }">
                <span>{{ item.description ?? '-' }}</span>
              </template>
            </Column>
            <Column field="actions" body-style="text-align: right">
              <template #body="{ data: item }">
                <Button v-tooltip.top="$t('actions.edit')" v-wave text rounded @click="editService(item.id)">
                  <template #icon>
                    <Icon name="mdi:pencil" />
                  </template>
                </Button>
              </template>
            </Column>
            <template #empty>
              <div class="flex flex-col items-center justify-center p-4">
                <p>{{ $t('management.services.noResults.title') }}</p>
              </div>
            </template>
          </DataTable>
        </template>
        <template #footer>
          <div class="flex flex-row-reverse gap-2">
            <Button v-wave :label="$t('actions.addService')" @click="addService()">
              <template #icon>
                <Icon name="mdi:plus" />
              </template>
            </Button>
          </div>
        </template>
      </Card>
    </div>
  </BasePageContainer>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { GET_SERVICES } from '~/graphql/management/services/index-page';
import { graphql } from '~/utils/graphql';

definePageMeta({
  layout: 'management',
  middleware: ['is-verified'],
  validate: (route) => yup.object({
    bookingProviderId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

useSeoMeta({
  title: 'Services',
});

const { $graphql } = useNuxtApp();
const route = useRoute();
const localeRoute = useLocaleRoute();

const { data, status } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_SERVICES), {
    id: route.params.bookingProviderId.toString(),
  });
});

if (! data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Booking Provider Not Found', fatal: true });
}

const editService = async (serviceId: string) => {
  const localeRoutePath = localeRoute({
    name: 'management-bookingProviderId-services-serviceId-edit',
    params: { serviceId },
  });

  await navigateTo(localeRoutePath);
};

const addService = async () => {
  const localeRoutePath = localeRoute({
    name: 'management-bookingProviderId-services-create',
  });

  await navigateTo(localeRoutePath);
};
</script>
