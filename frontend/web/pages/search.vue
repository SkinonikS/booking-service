<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col items-start md:flex-row gap-8">
      <div class="w-full md:w-80 md:sticky md:top-4">
        <aside>
          <div class="flex flex-col gap-2">
            <!-- <div class="flex flex-col gap-6">
            <h3 class="text-lg font-semibold">Price Range</h3>
            <div class="px-2">
              <Slider v-model="priceRange" :min="0" :max="100" :step="1" range />
            </div>
            <div class="flex items-center flex-row justify-between gap-4">
              <IconField>
                <InputNumber v-model="priceRange[0]" v-vilter fluid/>
                <InputIcon>
                  <Icon name="mdi:currency-eur" />
                </InputIcon>
              </IconField>
              <span>to</span>
              <IconField>
                <InputNumber v-model="priceRange[1]" fluid/>
                <InputIcon>
                  <Icon name="mdi:currency-eur" />
                </InputIcon>
              </IconField>
            </div>
          </div>
          <Divider/> -->
            <div>
              <h3 class="text-lg font-semibold mb-2">Categories</h3>
              <div class="flex items-center space-x-2 mb-2">
                <MultiSelect v-model="searchParams.categories" :options="options" option-label="label" option-value="value" placeholder="Select a City" class="w-full" />
              <!-- <Checkbox :value="true"/>
              <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Test
              </label> -->
              </div>
            </div>
            <div>
              <Button @click="applyFilters">Apply</Button>
            </div>
          </div>
        </aside>
      </div>
      <div class="w-full">
        <div class="flex flex-col gap-6">
          <Paginator v-model:first="paginator.offset.value" :class="paginatorClasses" :total-records="paginator.total.value" :rows="paginator.perPage.value" always-show />
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
            <Card v-for="item in bookings.products" :pt="{ body: { class: 'h-full' }, content: { class: 'h-full' } }" class="overflow-hidden">
              <template #header>
                <Image image-class="object-cover" :src="item.thumbnail" />
              </template>
              <template #title>
                <h2 v-tooltip.top="item.title" class="text-xl font-semibold overflow-hidden text-ellipsis whitespace-nowrap">{{ item.title }}</h2>
              </template>
              <template #subtitle>
                <div class="text-sm flex flex-row items-center gap-2">
                  <Icon name="mdi:map" size="1.25rem" />Paris, France
                </div>
              </template>
              <template #content>
                <div class="flex flex-col gap-2">
                  <div class="flex flex-row items-center gap-2">
                    <Icon name="mdi:star" size="1.25rem" class="text-yellow-400" />{{ item.rating }}
                  </div>
                </div>
              </template>
              <template #footer>
                <div class="flex flex-row gap-2">
                  <Button v-wave class="flex-none" text>
                    <Icon name="mdi:heart" size="1rem" />
                  </Button>
                  <Button v-wave class="flex-1" label="Book Now" />
                </div>
              </template>
            </Card>
          </div>
          <Paginator v-model:first="paginator.offset.value" :class="paginatorClasses" :total-records="paginator.total.value" :rows="paginator.perPage.value" always-show />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash';

const applyFilters = () => {
  refresh();
};

const loadingIndicator = useLoadingIndicator();

const options = ref([
  {
    label: 'String',
    value: 'String',
  },
  {
    label: 'String1',
    value: 'String1',
  },
]);

const searchParams = ref({
  categories: [],
});

const paginator = useOffsetPaginator({
  total: 0, // dummy value
  page: 1,
  perPage: 24,
});

const { refresh, status, data: bookings } = await useAsyncData('bookings', () => $fetch('https://dummyjson.com/products', {
  params: {
    limit: paginator.perPage.value,
    skip: paginator.offset.value,
    'categories[]': searchParams.value.categories,
  },
  onResponse: () => {
    loadingIndicator.finish();
  },
}), {
  watch: [
    searchParams,
    paginator.offset,
  ],
});

watch(paginator.offset, () => {
  loadingIndicator.start();
});

onMounted(() => {
  paginator.total.value = bookings.value?.total || 0;
});

const paginatorClasses = computed(() => ({
  'paginator--disabled': status.value === 'pending',
}));
</script>
