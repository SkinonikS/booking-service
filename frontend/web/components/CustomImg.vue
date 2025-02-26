<template>
  <Image>
    <template #image>
      <div ref="imgContainerRef" class="relative" :style="imgContainerStyles">
        <template v-if="state === 'pending'">
          <slot name="placeholder">
            <div class="flex items-center justify-center h-[inherit]">
              <ProgressSpinner style="width: 64px; height: 64px;" />
            </div>
          </slot>
        </template>
        <template v-else-if="state === 'error'">
          <slot name="error">
            <div class="flex flex-col gap-4 items-center justify-center h-full">
              <span class="text-sm">Failed to load image</span>
              <Button outlined size="small" label="Retry" @click="state = 'pending'">
                <template #icon>
                  <Icon name="mdi:reload" />
                </template>
              </Button>
            </div>
          </slot>
        </template>
        <template v-else>
          <img :src="imgSrc" :sizes="props.sizes" :style="imgStyles" loading="lazy">
          <div v-if="$slots.default" class="absolute inset-0">
            <slot />
          </div>
        </template>
      </div>
    </template>
  </Image>
</template>

<script setup lang="ts">
export type State = 'pending' | 'ready' | 'error';
export type ObjectFit = 'cover' | 'fill' | 'contain' | 'none' | 'scale-down';

export type Props = {
  height?: string;
  width?: string;
  src: string;
  sizes?: string;
  objectFit?: ObjectFit;
};

const props = withDefaults(defineProps<Props>(), {
  sizes: undefined,
  height: 'auto',
  width: 'auto',
  objectFit: 'cover',
});

const imgSrc = ref('');
const state = ref<State>('pending');

const imgContainerRef = useTemplateRef('imgContainerRef');

const intersectionObserver = useIntersectionObserver(imgContainerRef, ([entry], observer) => {
  if (entry.isIntersecting) {
    preloadImage();
    observer.unobserve(entry.target);
  }
}, {
  threshold: 0.2,
});

if (! intersectionObserver.isSupported) {
  imgSrc.value = props.src;
  state.value = 'ready';
}

const imgContainerStyles = computed(() => ({
  width: props.width,
  height: props.height,
}));

const imgStyles = computed(() => ({
  objectFit: props.objectFit,
  width: 'inherit',
  height: 'inherit',
  margin: 'auto',
}));

const preloadImage = (): HTMLImageElement => {
  const img = new Image();
  img.src = props.src;

  img.onload = () => {
    imgSrc.value = props.src;
    state.value = 'ready';
  };

  img.onerror = () => {
    state.value = 'error';
  };

  return img;
};

watch(() => props.src, () => {
  imgSrc.value = '';
  state.value = 'pending';
});

watch(state, (newState) => {
  if (newState === 'pending') {
    preloadImage();
  }
});
</script>
