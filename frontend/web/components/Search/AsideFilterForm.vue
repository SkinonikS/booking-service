<template>
  <form ref="formRef" class="flex flex-col gap-2" novalidate @submit="(e) => emit('submit', e)">
    <BaseFormMultiSelectInput :options="categories" name="categories" :label="$t('common.categories')" :loading="status === 'pending'" :disabled="props.disabled" class="col-span-1" />
    <BaseFormDatepickerInput name="date" :label="$t('common.date')" :loading="status === 'pending'" :disabled="props.disabled" class="col-span-1" />
    <BaseFormTextInput name="address" :label="$t('common.address')" :loading="status === 'pending'" :disabled="props.disabled" class="col-span-1" />
  </form>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { GET_FILTER_DATA } from '~/graphql/search-page';
import { graphql } from '~/utils/graphql';

export interface Props {
  disabled?: boolean;
}

export interface Emits {
  submit: [Event];
}

const formRef = useTemplateRef('formRef');

defineExpose({
  requestSubmit: () => formRef.value?.requestSubmit(),
});

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const { $graphql } = useNuxtApp();

const { data, status } = await useAsyncData(() => {
  return $graphql.default.request(graphql(/* GraphQL */ GET_FILTER_DATA));
}, {
  server: false,
  lazy: true,
});

const categories = computed(() => {
  if (! data.value) {
    return [];
  }

  return _.map(data.value?.categories, (category) => ({
    label: category.name,
    value: category.id,
  }));
});
</script>
