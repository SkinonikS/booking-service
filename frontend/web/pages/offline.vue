<template>
  <PageContainer>
    <div class="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      <div class="text-center max-w-lg">
        <div class="mb-8 flex justify-center">
          <Icon name="mdi:wifi-cancel" class="text-8xl text-gray-400 animate-pulse" />
        </div>
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">{{ $t('offline.title') }}</h1>
        <p class="text-gray-600 dark:text-white mb-8 text-lg">{{ $t('offline.description') }}</p>
        <div class="flex justify-center">
          <Button
            :label="$t('offline.retryButton')"
            icon="pi pi-refresh"
            class="p-button-raised"
            size="large"
            @click="checkConnection"
          />
        </div>
        <div class="mt-12 bg-blue-50 dark:bg-zinc-900 rounded-lg p-6 text-left">
          <h3 class="font-semibold text-blue-700 dark:text-white mb-2">{{ $t('offline.tipsTitle') }}</h3>
          <ul class="list-disc list-inside text-blue-800 dark:text-white space-y-2">
            <li>{{ $t('offline.tip1') }}</li>
            <li>{{ $t('offline.tip2') }}</li>
            <li>{{ $t('offline.tip3') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'offline',
});

const checkConnection = () => {
  if (navigator.onLine) {
    window.location.href = '/';
  } else {
    const toast = useToast();

    toast.add({
      severity: 'info',
      summary: 'Still Offline',
      detail: 'Please check your internet connection',
      life: 3000,
    });
  }
};
</script>
