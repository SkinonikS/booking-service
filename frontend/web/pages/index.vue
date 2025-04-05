<template>
  <section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
    <div class="container mx-auto text-center px-6">
      <h1 class="text-4xl font-bold mb-4">{{ $t('pages.homepage.title') }}</h1>
      <p class="text-xl mb-8">{{ $t('pages.homepage.description') }}</p>
      <div class="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
        <HomePageQuickSearch />
      </div>
    </div>
  </section>
  <section class="py-16 bg-gray-100 dark:bg-gray-500">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('common.categories') }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <HomePageRandomCategoriesSection />
      </div>
    </div>
  </section>
  <section class="py-16 px-4">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold mb-8 text-center">{{ $t('common.bookingProviders') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <HomePageRandomBookingProvidersSection />
      </div>
    </div>
  </section>
</template>

