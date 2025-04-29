<template>
  <BasePageRoot>
    <LayoutDefaultHeader />
    <BasePageMain class="row-span-1">
      <slot />
    </BasePageMain>
    <BasePageFooter class="row-span-1">
      <template #select>
        <LayoutLocaleSwitcher />
      </template>
    </BasePageFooter>
  </BasePageRoot>
  <LayoutDefaultDrawer />
  <DynamicDialog />
  <Toast />
</template>
