<script lang="ts" setup>

defineProps({
    'modelValue': {
        required: true,
        type: Boolean,
    },
    disabled: {
        required: false,
        type: Boolean,
    }
})
defineEmits(['update:modelValue'])

</script>
<template>
    <div
        :class="{'active' : modelValue}"
        class="switch"
        @click.prevent="!disabled ? $emit('update:modelValue', !modelValue) : null"
    >
        <span class="slider"></span>
    </div>
</template>
<style lang="scss" scoped>
.switch {
    @apply relative inline-block w-12 h-6 rounded-full shadow-inner cursor-pointer bg-neutral-400/60 hover:bg-neutral-400/70 transition-colors;

    .slider {
        @apply absolute top-0 left-0 bottom-0 rounded-full w-5 h-5 my-[2px] bg-white shadow-lg;

        @apply will-change-transform transition translate-x-[2px];
    }

    &.active {
        background-color: var(--accent);

        .slider {
            @apply translate-x-[26px];
        }
    }
}
</style>