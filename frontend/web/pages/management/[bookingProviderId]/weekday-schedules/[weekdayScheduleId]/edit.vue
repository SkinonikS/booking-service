<template>
  <PageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.pages.weekdaySchedulesEdit.title') }}</template>
        <template #subtitle>{{ $t('management.pages.weekdaySchedulesEdit.description') }}</template>
        <template #content>
          <ManagementFormEditWeekdaySchedule ref="formRef" :disabled="status === 'pending' || loading" @reset="handleReset" @submit="submitForm" />
        </template>
        <template #footer>
          <FormControls :loading="status === 'pending' || loading" :disabled="meta.dirty" @reset="formRef?.reset()" @submit="formRef?.requestSubmit()" />
        </template>
      </Card>
      <Card>
        <template #title>{{ $t('management.pages.weekdaySchedulesServices.title') }}</template>
        <template #subtitle>{{ $t('management.pages.weekdaySchedulesServices.description') }}</template>
        <template #content>
          <ManagementTableServices :weekday-schedule-id="weekdaySchedule?.id" />
        </template>
        <template #footer>
          <div class="flex flex-row-reverse">
            <Button v-wave :label="$t('common.addServiceSchedule')" @click="createServiceSchedule">
              <template #icon>
                <Icon name="mdi:plus" />
              </template>
            </Button>
          </div>
        </template>
      </Card>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import { gql } from 'nuxt-graphql-request/utils';
import * as yup from 'yup';
import type { WeekdaySchedule } from '~/types/models';

export interface GraphqlResponse {
  weekdaySchedule: Pick<WeekdaySchedule, 'id' | 'openTime' | 'closeTime' | 'isActive'>;
}

definePageMeta({
  layout: 'management',
  validate: (route) => yup.object({
    bookingProviderId: yup.string().required().uuid(),
    weekdayScheduleId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

const loading = ref(false);

const { $graphql } = useNuxtApp();
const localeRoute = useLocaleRoute();
const route = useRoute();
const toast = useToast();
const formRef = useTemplateRef('formRef');

const { data: weekdaySchedule, status } = await useAsyncData(async () => {
  const { weekdaySchedule } = await $graphql.default.request<GraphqlResponse>(gql`
    query weekdaySchedule($id: ID!) {
      weekdaySchedule(id: $id) {
        id
        isActive
        openTime
        closeTime
      }
    }
  `, { id: route.params.weekdayScheduleId.toString() });

  return weekdaySchedule;
});

if (! weekdaySchedule.value) {
  throw createError({ statusCode: 404, statusMessage: 'Weekday Schedule Not Found' });
}

const { handleSubmit, handleReset, meta } = useForm({
  initialValues: {
    isActive: weekdaySchedule.value.isActive,
    openTime: weekdaySchedule.value.openTime,
    closeTime: weekdaySchedule.value.closeTime,
  },
  validationSchema: toTypedSchema(yup.object({
    isActive: yup.boolean(),
    openTime: yup.number().integer().min(1).max(1439).test('is-earlier', 'Opening time must be earlier than closing time', (value, ctx) => {
      return value === undefined || value < ctx.parent.closeTime;
    }),
    closeTime: yup.number().integer().min(1).max(1439).test('is-later', 'Closing time must be later than opening time', (value, ctx) => {
      return value === undefined || value > ctx.parent.openTime;
    }),
  })),
});

const submitForm = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request(gql`
    mutation updateWeekdaySchedule($id: ID!, $isActive: Boolean!, $openTime: Int!, $closeTime: Int!) {
      updateWeekdaySchedule(id: $id, input: { isActive: $isActive, openTime: $openTime, closeTime: $closeTime }) {
        id
        isActive
        openTime
        closeTime
      }
    }
  `, {
      id: route.params.weekdayScheduleId.toString(),
      isActive: values.isActive,
      openTime: values.openTime,
      closeTime: values.closeTime,
    });

    toast.add({ summary: 'Weekday schedule updated successfully', severity: 'success' });
  } catch (e) {
    if (e instanceof Error) {
      toast.add({ summary: e.message, severity: 'error' });
    } else {
      toast.add({ summary: 'An unknown error occurred', severity: 'error' });
    }
  } finally {
    loading.value = false;
  }
});

const createServiceSchedule = async () => {
  const localeRoutePath = localeRoute({
    name: 'management-bookingProviderId-weekday-schedules-weekdayScheduleId-service-schedules-create',
  });

  await navigateTo(localeRoutePath ?? '/');
};
</script>
