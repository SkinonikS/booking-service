<template>
  <Card>
    <template #title>
      <slot name="title" />
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
    <template #content>
      <form ref="formRef" class="flex flex-col gap-4">
        <slot name="inputs" />
      </form>
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </Card>
</template>
