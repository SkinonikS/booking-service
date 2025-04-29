<template>
  <BasePageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>Edit weekly schedule</template>
        <template #subtitle>Update the details of your weekly schedule.</template>
        <template #content>
          <WeekdayScheduleEditForm ref="formRef" :disabled="status === 'pending' || loading" @submit="editWeekdaySchedule" />
        </template>
        <template #footer>
          <BaseFormControls :loading="status === 'pending' || loading" :disabled="meta.dirty" @reset="handleReset()" @submit="formRef?.requestSubmit()" />
        </template>
      </Card>
      <Card>
        <template #title>Service schedules</template>
        <template #subtitle>Manage service schedules.</template>
        <template #content>
          <template v-if="status === 'success'">
            <ServiceScheduleSection :weekday-schedule-id="(data?.weekdaySchedule?.id) as unknown as string" />
          </template>
        </template>
        <template #footer>
          <div class="flex flex-row-reverse">
            <Button v-wave label="Add service schedule" @click="createServiceSchedule">
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
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { GET_WEEKDAY_SCHEDULE, UPDATE_WEEKDAY_SCHEDULE } from '~/graphql/management/weekday-schedules/edit-page';
import { graphql } from '~/utils/graphql';

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

const { data, status } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_WEEKDAY_SCHEDULE), {
    id: route.params.weekdayScheduleId.toString(),
  });
});

if (! data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Weekday Schedule Not Found', fatal: true });
}

useSeoMeta({
  title: `Edit ${getWeekdayNameById(data.value.weekdaySchedule?.weekday ?? 0).toLowerCase()}`,
});

const { handleSubmit, handleReset, meta } = useForm({
  initialValues: {
    isActive: data.value?.weekdaySchedule?.isActive,
    openTime: data.value?.weekdaySchedule?.openTime,
    closeTime: data.value?.weekdaySchedule?.closeTime,
  },
  validationSchema: toTypedSchema(yup.object({
    isActive: yup.boolean().required(),
    openTime: yup.number().integer().required().min(1).max(1439).test('is-earlier', 'Opening time must be earlier than closing time', (value, ctx) => {
      return value === undefined || value < ctx.parent.closeTime;
    }),
    closeTime: yup.number().integer().required().min(1).max(1439).test('is-later', 'Closing time must be later than opening time', (value, ctx) => {
      return value === undefined || value > ctx.parent.openTime;
    }),
  })),
});

const editWeekdaySchedule = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request(graphql(/* GraphQL */ UPDATE_WEEKDAY_SCHEDULE), {
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
