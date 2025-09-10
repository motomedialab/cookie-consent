<script lang="ts" setup>
import SliderInput from './SliderInput.vue'
import type { PropType } from 'vue'
import { computed, ref, watch } from 'vue'
import cookieConsent from '@/CookieConsent.vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  },
  buttonText: {
    required: true,
    type: Object as PropType<cookieConsent['text']['buttons']>
  },
  type: {
    required: true,
    type: String as PropType<keyof preferenceTypes>
  },
  settings: {
    required: true,
    type: Object as PropType<cookieConsent['settings']>
  },
  disabled: {
    required: false,
    type: Boolean
  }
})

const checked = ref(props.modelValue)
const moreDetails = ref(false)

const details = computed(() => props.settings![props.type])

watch(checked, (value) => emit('update:modelValue', value))
</script>
<template>
  <li v-if="details">
    <label data-test="label">
      <template v-if="details.title">
        {{ details.title }}
      </template>
      <template v-else>{{ type[0].toUpperCase() + type.substring(1) }} cookies</template>
      <SliderInput v-model="checked" :disabled="disabled" />
    </label>

    <p v-if="details.description" data-test="description" v-text="details.description" />

    <template v-if="details.cookies?.length ?? 0 > 0">
      <a
        v-if="!moreDetails"
        data-test="details-btn"
        href="#"
        @click.prevent="moreDetails = true"
        v-text="buttonText.moreDetails"
      />

      <div v-if="moreDetails" class="details">
        <ul v-for="(cookie, key) in details.cookies" v-bind:key="`${key}_${cookie.name}`">
          <li>
            <strong v-text="cookie.name" />
            <span v-if="cookie.expires" v-text="cookie.expires" />
            <p v-if="cookie.description" v-text="cookie.description" />
          </li>
        </ul>

        <a
          v-if="moreDetails"
          href="#"
          @click.prevent="moreDetails = false"
          v-text="buttonText.lessDetails"
        />
      </div>
    </template>
  </li>
</template>
<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

ul,
li {
  @apply p-0 m-0 list-none;
}

ul > li {
  @apply p-4 border-b m-0;

  &:last-child {
    @apply border-b-0 pb-0;
  }

  label {
    @apply flex justify-between items-center leading-none font-semibold mb-1;
  }

  p {
    @apply w-full leading-tight text-sm mb-1 text-justify;
  }

  a {
    @apply text-sm no-underline hover:bg-transparent;
    color: var(--accent);
  }
}

.details {
  @apply mt-2 text-sm text-neutral-600 mb-1;

  ul li {
    @apply p-0 py-1 border-none mb-px flex flex-wrap flex-row justify-between text-justify items-end;

    strong {
      @apply font-semibold inline text-sm mr-1;
    }

    span {
      @apply text-xs;
    }

    p {
      @apply text-xs mb-0;
    }
  }
}
</style>
