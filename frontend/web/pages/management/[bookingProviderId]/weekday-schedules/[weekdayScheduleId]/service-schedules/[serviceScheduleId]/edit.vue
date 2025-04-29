<template>
  <BasePageContainer>
    <div class="flex flex-col gap-4">
      <Card>
        <template #title>{{ $t('management.pages.serviceSchedultEdit.title') }}</template>
        <template #subtitle>{{ $t('management.pages.serviceSchedultEdit.description') }}</template>
        <template #content>
          <ServiceScheduleEditForm ref="formRef" :disabled="status === 'pending' || loading" @submit="editServiceSchedule" />
        </template>
        <template #footer>
          <BaseFormControls :disabled="meta.dirty || status === 'pending' || loading" @reset="handleReset()" @submit="formRef?.requestSubmit()">
            <template #before>
              <div class="grow" />
              <Button v-wave text :loading="status === 'pending' || loading" :label="$t('common.delete')" severity="danger" @click="deleteServiceSchedule()">
                <template #icon>
                  <Icon name="mdi:delete" />
                </template>
              </Button>
            </template>
          </BaseFormControls>
        </template>
      </Card>
    </div>
  </BasePageContainer>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { GET_SERVICE_SCHEDULE, DELETE_SERVICE_SCHEDULE, UPDATE_SERVICE_SCHEDULE } from '~/graphql/management/weekday-schedules/service-schedules/edit-page';
import { graphql } from '~/utils/graphql';

definePageMeta({
  layout: 'management',
  validate: (route) => yup.object({
    serviceScheduleId: yup.string().required().uuid(),
    bookingProviderId: yup.string().required().uuid(),
    weekdayScheduleId: yup.string().required().uuid(),
  }).isValidSync(route.params),
});

const loading = ref(false);

const localeRoute = useLocaleRoute();
const { $graphql } = useNuxtApp();
const route = useRoute();
const toast = useToast();

const formRef = useTemplateRef('formRef');

const { data, status } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_SERVICE_SCHEDULE), {
    id: route.params.serviceScheduleId.toString(),
  });
});

if (! data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Service Schedule Not Found', fatal: true });
}

useSeoMeta({
  title: `Edit ${data.value?.serviceSchedule?.service?.name} schedule`,
});

const { handleReset, handleSubmit, meta } = useForm({
  initialValues: {
    isActive: data.value?.serviceSchedule?.isActive,
    openTime: data.value?.serviceSchedule?.openTime,
    closeTime: data.value?.serviceSchedule?.closeTime,
    maxBookings: data.value?.serviceSchedule?.maxBookings,
    timeSpan: data.value?.serviceSchedule?.timeSpan,
  },
  validationSchema: toTypedSchema(yup.object({
    isActive: yup.boolean().required().label('Activation status'),
    timeSpan: yup.number().integer().required().min(1).max(60).label('Time span'),
    maxBookings: yup.number().integer().required().min(1).max(255).label('Max bookings'),
    openTime: yup.number().integer().required().min(1).max(1439).test('is-earlier', 'Opening time must be earlier than closing time', (value, ctx) => {
      return value === undefined || value < ctx.parent.closeTime;
    }).label('Open time'),
    closeTime: yup.number().integer().required().min(1).max(1439).test('is-later', 'Closing time must be later than opening time', (value, ctx) => {
      return value === undefined || value > ctx.parent.openTime;
    }).label('Close time'),
  })),
});

const editServiceSchedule = handleSubmit(async (values) => {
  loading.value = true;

  try {
    await $graphql.default.request(graphql(/* GraphQL */ UPDATE_SERVICE_SCHEDULE), {
      id: route.params.serviceScheduleId.toString(),
      isActive: values.isActive,
      openTime: values.openTime,
      closeTime: values.closeTime,
      maxBookings: values.maxBookings,
      timeSpan: values.timeSpan,
    });

    toast.add({ summary: 'Service schedule updated successfully', severity: 'success' });

    await redirectBack();
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

const deleteServiceSchedule = async () => {
  loading.value = true;

  try {
    await $graphql.default.request(graphql(/* GraphQL */ DELETE_SERVICE_SCHEDULE), {
      id: route.params.serviceScheduleId.toString(),
    });

    toast.add({ summary: 'Service schedule deleted successfully', severity: 'success' });

    await redirectBack();
  } catch (e) {
    if (e instanceof Error) {
      toast.add({ summary: e.message, severity: 'error' });
    } else {
      toast.add({ summary: 'An error occurred while deleting the service schedule', severity: 'error' });
    }
  } finally {
    loading.value = false;
  }
};

const redirectBack = async () => {
  const localeRoutePath = localeRoute({
    name: 'management-bookingProviderId-weekday-schedules-weekdayScheduleId-edit',
    params: {
      bookingProviderId: route.params.bookingProviderId,
      weekdayScheduleId: route.params.weekdayScheduleId,
    },
  });

  await navigateTo(localeRoutePath ?? '/');
}
</script>
