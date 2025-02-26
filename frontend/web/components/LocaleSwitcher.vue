<template>
  <Select
    :options="availableLocales"
    :model-value="locale"
    size="small"
    option-label="name"
    option-value="code"
    placeholder="Select"
    @update:model-value="onLocaleChange"
  />
</template>

<script setup>
import _ from 'lodash';
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() => {
  return _.map(locales.value, (i) => ({
    code: i.code,
    name: i.name,
  }));
});

const onLocaleChange = (locale) => {
  setLocale(locale);
};
</script>
