<template>
  <PageRoot>
    <ManagementLayoutHeader class="row-span-1" />
    <PageMain class="row-span-1">
      <div class="lg:pl-[var(--sidebar-width)]">
        <slot />
      </div>
    </PageMain>
    <PageFooter class="lg:pl-[var(--sidebar-width)] row-span-1" />
  </PageRoot>
  <DynamicDialog />
  <ManagementLayoutMobileDrawer class="lg:hidden" />
  <ManagementLayoutDesktopDrawer />
  <Toast />
</template>
