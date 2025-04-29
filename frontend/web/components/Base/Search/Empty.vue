<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-center items-center p-6">
      <Icon name="mdi:note-off-outline" size="6rem" />
    </div>
    <h2 class="text-xl font-semibold text-center">
      <slot name="title" />
    </h2>
    <div class="text-sm flex flex-row justify-center items-center gap-2">
      <slot name="subtitle" />
    </div>
    <div class="flex flex-col gap-2 text-center">
      <slot name="description" />
    </div>
  </div>
</template>
