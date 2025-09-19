<script lang="ts" setup>
defineProps({
  modelValue: {
    required: true,
    type: Boolean
  },
  disabled: {
    required: false,
    type: Boolean
  }
})
defineEmits(['update:modelValue'])
</script>
<template>
  <div
    :class="{ active: modelValue, disabled: disabled }"
    class="__switch"
    @click.prevent="disabled ? null : $emit('update:modelValue', !modelValue)"
  >
    <span class="__slider"></span>
  </div>
</template>
<style lang="scss" scoped>
.__switch {
  @apply relative inline-block w-10 h-6 rounded-full shadow-inner cursor-pointer bg-neutral-400/60 hover:bg-neutral-400/70 transition-colors;

  .__slider {
    @apply absolute p-0 top-0 left-0 bottom-0 rounded-full w-5 h-5 my-[2px] bg-white shadow-lg;

    @apply will-change-transform transition;
    transform: translateX(2px);
  }

  &.active {
    background-color: var(--accent);

    .__slider {
      transform: translateX(18px);
    }
  }

  &.disabled {
    @apply opacity-50 cursor-not-allowed;
  }
}
</style>
