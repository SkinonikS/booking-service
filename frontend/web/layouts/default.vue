<template>
  <PageRoot>
    <DefaultLayoutHeader class="row-span-1" />
    <PageMain class="row-span-1">
      <slot />
    </PageMain>
    <PageFooter class="row-span-1" />
  </PageRoot>
  <DynamicDialog />
  <DefaultLayoutDrawer />
  <Toast />
</template>

