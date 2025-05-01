<template>
  <BaseSearchAsideFilter :loading="props.loading" :disabled="! meta.dirty" @reset="reset()" @search="formRef?.requestSubmit()">
    <template #form>
      <SearchAsideFilterForm ref="formRef" :disabled="props.loading" @submit="submitForm" />
    </template>
  </BaseSearchAsideFilter>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { DateTime } from 'luxon';
import * as yup from 'yup';

export interface Props {
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const formRef = useTemplateRef('formRef');

const searchStore = useSearchStore();
const { handleSubmit, resetForm, meta } = useForm({
  initialValues: {
    categories: searchStore.categories,
    date: searchStore.date,
    address: searchStore.address,
    name: searchStore.name,
  },
  validationSchema: toTypedSchema(yup.object({
    categories: yup.array().of(yup.string().uuid()).nullable(),
    date: yup.mixed().nullable().test('is-date', 'Invalid date', (value) => {
      return value && value instanceof DateTime || true;
    }),
    address: yup.string().nullable(),
    name: yup.string().nullable(),
  })),
});

const reset = () => {
  resetForm();
  formRef?.value?.requestSubmit();
};

const submitForm = handleSubmit(async (values) => {
  searchStore.categories = values.categories as string[] | null | undefined;
  searchStore.date = values.date as DateTime | null | undefined;
  searchStore.address = values.address;
  searchStore.name = values.name;
});
</script>
