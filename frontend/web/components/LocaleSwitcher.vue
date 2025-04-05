<template>
  <Select
    :options="availableLocales"
    :model-value="locale"
    size="small"
    option-label="name"
    option-value="code"
    :loading="loading"
    @update:model-value="onLocaleChange"
  />
</template>

<script setup>
import _ from 'lodash';
const { locale, locales, setLocale } = useI18n();

const loading = ref(false);

const availableLocales = computed(() => _.map(locales.value, (i) => ({
  code: i.code,
  name: i.name,
})));

const onLocaleChange = async (locale) => {
  loading.value = true;

  try {
    await setLocale(locale);
  } finally {
    loading.value = false;
  }
};
</script>
