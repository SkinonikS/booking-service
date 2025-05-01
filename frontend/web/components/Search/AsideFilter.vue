<template>
  <BaseSearchAsideFilter @reset="reset()" @search="formRef?.requestSubmit()">
    <template #form>
      <SearchAsideFilterForm ref="formRef" @submit="submitForm" />
    </template>
  </BaseSearchAsideFilter>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { DateTime } from 'luxon';
import * as yup from 'yup';

const formRef = useTemplateRef('formRef');

const searchStore = useSearchStore();
const { handleReset, handleSubmit } = useForm({
  initialValues: {
    categories: searchStore.categories,
    date: searchStore.date,
    address: searchStore.address,
    name: searchStore.name,
  },
  validationSchema: toTypedSchema(yup.object({
    categories: yup.array().of(yup.string().uuid()).nullable(),
    date: yup.mixed().test('is-date', 'Invalid date', (value) => value instanceof DateTime).nullable(),
    address: yup.string().nullable(),
    name: yup.string().nullable(),
  })),
});

const reset = () => {
  handleReset();
  formRef?.value?.requestSubmit();
};

const submitForm = handleSubmit(async (values) => {
  searchStore.categories = values.categories as string[] | null | undefined;
  searchStore.date = values.date as DateTime | null | undefined;
  searchStore.address = values.address;
  searchStore.name = values.name;
});
</script>
