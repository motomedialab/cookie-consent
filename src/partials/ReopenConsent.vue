<script lang="ts" setup>
import { computed, type PropType } from 'vue'

defineEmits(['click'])

const props = defineProps({
  data: {
    type: Object as PropType<cookieConsent>,
    required: true
  }
})

/**
 * @returns Boolean
 */
const position = computed(() => props.data!.styling?.position === 'right')

const positionLeft = computed(() => (position.value ? 'auto' : 0))
const positionRight = computed(() => (position.value ? 0 : 'auto'))
const borderRadius = computed(() => (position.value ? '8px 0 0 8px' : '0 8px 8px 0'))
const translateLength = computed(() => (position.value ? '140px' : '-140px'))
const textPadding = computed(() => (position.value ? '0 0 0 8px' : '0 8px 0 0 '))
const flexDirection = computed(() => (position.value ? 'row' : 'row-reverse'))
</script>
<template>
  <button id="cookieconsent__reopen" @click.prevent="$emit('click')">
    <svg height="16" viewBox="0 0 512 512" width="16" xmlns="http://www.w3.org/2000/svg">
      <!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.-->
      <path
        d="M182.8 28.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9 64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9c-.9-5.3-5.3-9.3-10.6-10.1c-51.5-8.2-92.8-47.1-104.5-97.4c-1.8-7.6-8-13.4-15.7-14.6c-54.6-8.7-97.7-52-106.2-106.8c-.8-5.4-4.9-9.8-10.3-10.6c-22.1-3.1-44.6 .9-64.4 11.4zm46.3 19.7c15 58.3 62 103.6 121.2 116.4c15.6 54.1 59 96.4 113.7 110.5c0 11.2-2.5 22.3-7.5 32.5L419.8 383c-6.8 14.1-17.9 25.6-31.7 32.9l-74 39.5c-13.7 7.3-29.4 10.1-44.8 7.9l-83-11.7c-15.4-2.2-29.7-9.2-40.9-20L85.1 373.2c-11.2-10.9-18.7-25-21.4-40.4L49.1 250c-2.7-15.4-.5-31.3 6.4-45.4L92.2 129c6.8-14.1 17.9-25.6 31.7-32.9l74-39.5c9.7-5.2 20.4-8.1 31.2-8.6zM184 192a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm8 184a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM312 256a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm40 120a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
      />
    </svg>
    <span v-text="props.data.text.reopen" />
  </button>
</template>
<style lang="scss" scoped>
#cookieconsent__reopen {
  left: v-bind(positionLeft);
  right: v-bind(positionRight);
  transform: translateX(v-bind(translateLength));
  border-radius: v-bind(borderRadius);
  display: flex;
  flex-direction: v-bind(flexDirection);

  @apply fixed bottom-0 items-center text-neutral-950 mb-3 p-2 bg-white shadow-lg cursor-pointer;
  @apply border border-neutral-200 z-[999998];
  @apply will-change-transform transition hover:translate-x-0;

  svg {
    @apply block w-6 h-6;
  }

  span {
    padding: v-bind(textPadding);
    @apply font-sans text-sm font-semibold overflow-hidden whitespace-nowrap transition;
  }
}
</style>
