<template>
  <BasePageRoot>
    <LayoutManagementHeader class="row-span-1" />
    <BasePageMain class="row-span-1">
      <div class="lg:pl-[var(--sidebar-width)]">
        <slot />
      </div>
    </BasePageMain>
    <BasePageFooter class="lg:pl-[var(--sidebar-width)] row-span-1">
      <template #select>
        <LayoutLocaleSwitcher />
      </template>
    </BasePageFooter>
  </BasePageRoot>
  <LayoutManagementMobileDrawer class="lg:hidden" />
  <LayoutManagementDesktopDrawer />
  <DynamicDialog />
  <Toast />
</template>
