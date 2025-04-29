<template>
  <NuxtLayout name="error">
    <div class="container mx-auto px-4 py-8 relative h-full flex flex-col items-center justify-center">
      <div class="absolute inset-0 z-[-1] bg-[radial-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_50%,transparent_100%)]"/>
      <div class="flex flex-col items-center">
        <h1 class="text-6xl font-bold text-white mb-2">{{ errorData.code }}</h1>
        <h2 class="text-white text-2xl font-semibold mb-6">{{ $t(errorData.title) }}</h2>
        <p class="text-center text-gray-400 mb-6">{{ $t(errorData.description) }}</p>
        <pre v-if="stackTrace" class="text-gray-400 mb-6 text-wrap">
{{ stackTrace }}
        </pre>
        <div class="flex flex-row justify-center gap-2">
          <Button v-wave :loading="loading" :label="$t('actions.goBack')" @click="goBack">
            <template #icon>
              <Icon name="mdi:arrow-left" />
            </template>
          </Button>
          <Button v-wave text :loading="loading" :label="$t('actions.goHome')" @click="goHomepage">
            <template #icon>
              <Icon name="mdi:home" />
            </template>
          </Button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

export type ErrorData = {
  title: string;
  description: string;
  code: string;
};

export type Props = {
  error: NuxtError;
};

const props = defineProps<Props>();

const loading = ref(false);

const errorData = computed<ErrorData>(() => {
  const errorCode = props.error?.statusCode || 500;

  return {
    title: `errors.${errorCode}.title`,
    description: `errors.${errorCode}.description`,
    code: errorCode.toString(),
  };
});

const router = useRouter();

const stackTrace = import.meta.dev
  ? props.error.stack
  : undefined;

const goBack = () => {
  loading.value = true;
  clearError().then(() => router.back());
};

const goHomepage = () => {
  loading.value = true;
  clearError().then(() => router.push('/'));
};
</script>
