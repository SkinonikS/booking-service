<template>
  <BaseSearchAsideFilter @reset="reset()" @search="formRef?.requestSubmit()">
    <template #form>
      <SearchAsideFilterForm ref="formRef" @submit="submitForm" />
    </template>
  </BaseSearchAsideFilter>
</template>

<script setup lang="ts">
import * as yup from 'yup';

const formRef = useTemplateRef('formRef');

const searchStore = useSearchStore();
const { handleReset, handleSubmit } = useForm({
  initialValues: {
    categories: searchStore.categories,
    date: searchStore.date,
    address: searchStore.address,
  },
  validationSchema: toTypedSchema(yup.object({
    categories: yup.array().of(yup.string().uuid()).nullable(),
    date: yup.date().nullable(),
    address: yup.string().nullable(),
  })),
});

const reset = () => {
  handleReset();
  formRef?.value?.requestSubmit();
};

const submitForm = handleSubmit(async (values) => {
  searchStore.categories = values.categories;
  searchStore.date = values.date;
  searchStore.address = values.address;
});
</script>
