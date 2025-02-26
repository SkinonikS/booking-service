<template>
  <div class="flex flex-col h-dvh">
    <header>
      <div class="container mx-auto p-4 flex items-center justify-between">
        <NuxtLink href="/" class="text-2xl font-bold text-primary">
          YourNameHere
        </NuxtLink>
        <AppDrawer />
      </div>
    </header>
    <main class="grow">
      <slot />
    </main>
    <footer class="bg-gray-100 dark:bg-gray-500 py-8">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 class="font-semibold mb-4">About</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink href="#">
                  About Us
                </NuxtLink>
              </li>
              <li>
                <NuxtLink href="#">
                  Careers
                </NuxtLink>
              </li>
              <li>
                <NuxtLink href="#">
                  Press
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-4">Support</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink href="#">
                  Help Center
                </NuxtLink>
              </li>
              <li>
                <NuxtLink href="#">
                  Safety Information
                </NuxtLink>
              </li>
              <li>
                <NuxtLink href="#">
                  Cancellation Options
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-4">Legal</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink href="#">
                  Terms of Service
                </NuxtLink>
              </li>
              <li>
                <NuxtLink href="#">
                  Privacy Policy
                </NuxtLink>
              </li>
              <li>
                <NuxtLink href="#">
                  Cookie Policy
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-4">Follow Us</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink href="#">
                  Facebook
                </NuxtLink>
              </li>
              <li>
                <NuxtLink href="#">
                  Twitter
                </NuxtLink>
              </li>
              <li>
                <Link href="#">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600 text-center">
          <p>&copy; 2023 BookingService. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">

</script>
