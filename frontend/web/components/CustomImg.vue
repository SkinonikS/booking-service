<template>
  <Image>
    <template #image>
      <div ref="imgContainerRef" :class="['relative overflow-hidden', props.class]" :style="[{ width: props.width, height: props.height, aspectRatio: props.aspectRatio }, props.style]">
        <template v-if="state === 'pending'">
          <slot name="placeholder">
            <div class="flex items-center justify-center h-[inherit]">
              <ProgressSpinner style="width: 64px; height: 64px;" />
            </div>
          </slot>
        </template>
        <template v-else-if="state === 'error'">
          <slot name="error" :retry="() => (state = 'pending')">
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
          <img :src="imgSrc" :sizes="props.sizes" :style="{ objectFit: props.objectFit, objectPosition: props.objectPosition, width: 'inherit', height: 'inherit', margin: 'auto' }" >
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
  class?: string;
  style?: string;
  height?: string;
  width?: string;
  src: string;
  sizes?: string;
  objectFit?: ObjectFit;
  objectPosition?: string;
  aspectRatio?: number;
};

const props = withDefaults(defineProps<Props>(), {
  class: '',
  style: '',
  sizes: undefined,
  height: 'auto',
  width: 'auto',
  objectPosition: 'center',
  objectFit: 'cover',
  aspectRatio: 16 / 9,
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
