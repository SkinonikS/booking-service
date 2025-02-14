<template>
  <section class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
    <div class="container mx-auto text-center px-6">
      <h1 class="text-4xl font-bold mb-4">Find and Book Amazing Experiences</h1>
      <p class="text-xl mb-8">Discover the best activities, tours, and attractions around the world</p>
      <div class="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
        <form class="flex flex-wrap gap-4">
          <InputText type="text" placeholder="Where are you going?" class="flex-grow" />
          <DatePicker :min-date="new Date()" show-icon class="w-full md:w-auto">
            <template #dropdownicon>
              <Icon name="mdi:calendar" />
            </template>
          </DatePicker>
          <Button label="Search" type="submit" class="w-full md:w-auto">
            <template #icon>
              <Icon name="mdi:magnify" />
            </template>
          </Button>
        </form>
      </div>
    </div>
  </section>
  <section class="py-16 bg-gray-100 dark:bg-gray-500">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card v-for="i in 6" class="hover:shadow-lg transition-shadow cursor-pointer">
          <template #content>
            <div class="flex flex-col items-center justify-center">
              <Icon name="mdi:home" size="3rem" class="text-primary" />
              <h3 class="font-semibold text-lg">Test</h3>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
  <section class="py-16 px-4">
    <div class="container mx-auto">
      <h2 class="text-3xl font-bold mb-8 text-center">Recommended Offers</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card v-for="i in 4" :dt="{ body: { gap: '1rem' } }" class="overflow-hidden">
          <template #header>
            <Image
              src="https://placehold.co/300x200"
              width="100%"
              height="200"
            />
          </template>
          <template #content>
            <h3 class="font-semibold text-lg mb-2">Paris City Tour</h3>
            <div class="flex items-center mb-2">
              <Icon name="mdi:star" class="h-5 w-5 text-yellow-400 fill-current" />
              <span class="ml-1 text-sm">4.8</span>
            </div>
            <p class="text-xl font-bold">$32</p>
          </template>
          <template #footer>
            <div>
              <Button class="w-full">Book Now</Button>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
