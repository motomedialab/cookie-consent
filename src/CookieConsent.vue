<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, onBeforeMount, ref } from 'vue'
import ReopenConsent from '@/partials/ReopenConsent.vue'
import CustomiseItem from '@/partials/CustomiseItem.vue'

const props = defineProps({
  data: {
    type: Object as PropType<cookieConsent>,
    required: true
  }
})

// define our custom data attributes.
const buttonColor = computed(() => props.data!.styling?.buttonColor || '#737373')
const customSettings = props.data!.settings

// reactive properties
const customiseOpen = ref(false)
const preferencesExist = ref(false)
const preferences = ref({
  functionality: true,
  ad: true,
  analytics: true,
  personalization: true,
  security: true
} as preferenceTypes)

const preferenceManager = {
  set: (values: { [key: string]: boolean }) => {
    let setValues = {} as preferenceTypes

    Object.keys(preferences.value).forEach((key) => {
      setValues[key as keyof typeof preferences.value] = values[key] ?? false
    })

    localStorage.setItem('cookieConsent', JSON.stringify(values))

    preferences.value = setValues
    preferencesExist.value = true

    applyGtagPreferences()
    resetState()
  },

  onlyEssential: () => {
    let setValues = preferences.value

    if (typeof customSettings === 'undefined') {
      preferenceManager.applyCustom()
      return
    }

    Object.keys(preferences.value).forEach((key) => {
      const typedKey = key as keyof preferenceTypes
      setValues[typedKey] = customSettings[typedKey]?.essential ?? false
    })

    preferenceManager.set(setValues)
  },

  acceptAll: () => {
    let setValues: { [key: string]: boolean } = {}

    Object.keys(preferences.value).forEach((key) => {
      setValues[key] = true
    })

    preferenceManager.set(setValues)
  },

  applyCustom: () => {
    let setValues: { [key: string]: boolean } = {}

    // reject all by default
    Object.keys(preferences.value).forEach((key) => {
      setValues[key] = false
    })

    // process our custom settings
    Object.keys(customSettings ?? {}).forEach((key) => {
      const typedKey = key as keyof preferenceTypes
      setValues[typedKey] = preferences.value[typedKey]
    })

    preferenceManager.set(setValues)
  }
}

const resetState = () => (customiseOpen.value = false)

const cookieText = props.data?.text.cookiePolicy.replace(
  /:link\((.*?)\)/,
  `<a id="cookieconsent__link" href="${props.data?.cookiePolicy}" target="_blank">$1</a>`
)

const applyGtagPreferences = (denied = false) => {
  let setValues: { [key: string]: string } = {}

  Object.keys(preferences.value).forEach(
    (key) =>
      (setValues[key + '_storage'] =
        !denied && preferences.value[key as keyof typeof preferences.value] ? 'granted' : 'denied')
  )

  // @ts-ignore: tell google our preferences.
  window.gtag('consent', 'update', setValues)

  setTimeout(
    // @ts-ignore: push event to dataLayer, so we can apply appropriate tags
    () => (window.dataLayer ? window.dataLayer.push({ event: 'consentUpdated' }) : null),
    150
  )
}

onBeforeMount(() => {
  const storedPreferences = localStorage.getItem('cookieConsent')

  if (storedPreferences) {
    preferences.value = JSON.parse(storedPreferences)
    preferencesExist.value = true

    // apply our preferences
    applyGtagPreferences()
  } else {
    // deny by default
    applyGtagPreferences(true)
  }
})
</script>

<template>
  <transition-group>
    <!-- Cookie Consent Overlays -->
    <div v-if="!preferencesExist">
      <div id="cookieconsent__overlay"></div>

      <!-- Outer Wrapper -->
      <div id="cookieconsent" :class="{ open: customiseOpen }">
        <!-- Inner Wrapper -->
        <div id="cookieconsent__wrapper">
          <!-- Consent Text -->
          <div v-if="!customiseOpen" id="cookieconsent__content">
            <strong v-text="data.text.title" />
            <p v-text="data.text.description" />

            <p v-if="data.cookiePolicy" v-html="cookieText" />

            <button
              v-text="data.text.buttons.onlyEssentials"
              @click.prevent="preferenceManager.onlyEssential"
            />
            <button
              v-text="data.text.buttons.acceptAll"
              @click.prevent="preferenceManager.acceptAll"
            />
          </div>

          <!-- Customisation Text -->
          <div v-if="customSettings" id="cookieconsent__customisewrapper">
            <a
              id="cookieconsent__customisebtn"
              :class="{ open: customiseOpen }"
              href="#"
              @click.prevent="customiseOpen = !customiseOpen"
            >
              <span>Customise</span>
              <svg height="16" viewBox="0 0 448 512" width="14" xmlns="http://www.w3.org/2000/svg">
                <!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.-->
                <path
                  d="M224 137.4l11.3 11.3 160 160L406.6 320 384 342.6l-11.3-11.3L224 182.6 75.3 331.3 64 342.6 41.4 320l11.3-11.3 160-160L224 137.4z"
                />
              </svg>
            </a>

            <div v-if="customiseOpen" id="cookieconsent__customise">
              <ul>
                <CustomiseItem
                  v-for="(setting, type) in customSettings"
                  v-bind:key="type"
                  v-model="preferences[type as keyof preferenceTypes]"
                  :disabled="setting!.essential"
                  :settings="customSettings"
                  :type="type"
                />
              </ul>
            </div>

            <div v-if="customiseOpen" id="cookieconsent__customise__submit">
              <button
                v-text="data.text.buttons.savePreferences"
                @click.prevent="preferenceManager.applyCustom"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- /Outer Wrapper -->
    </div>

    <ReopenConsent :data="data" v-else @click="preferencesExist = !preferencesExist" />
  </transition-group>
</template>
<style>
#cookieconsent__link {
  @apply text-neutral-900 underline cursor-pointer hover:bg-transparent;
}
</style>
<style lang="scss" scoped>
@tailwind base;

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.custom-btn {
  @apply block mb-1 w-full cursor-pointer text-base transition-opacity leading-none p-3 font-semibold text-white rounded bg-neutral-500;
  background-color: v-bind(buttonColor);

  &:hover,
  &:disabled {
    @apply opacity-80;
  }
}

#cookieconsent {
  --accent: v-bind(buttonColor);

  @apply fixed bottom-0 right-0 font-sans w-full sm:w-96 pb-0 text-neutral-900;
  @apply flex max-h-screen z-[999999] font-sans text-base font-light tracking-normal leading-normal;

  &__wrapper {
    @apply w-full sm:m-3 bg-white sm:rounded-lg shadow border border-gray-200 overflow-y-hidden;
  }

  &__link {
    @apply text-neutral-900 visited:text-neutral-900;
  }

  &__overlay {
    @apply transition-all z-[999998] fixed top-0 left-0 w-full h-full bg-black opacity-50;
  }

  &__content {
    @apply p-4;
  }

  &__content,
  &__customise {
    button {
      @apply custom-btn;
    }

    p,
    strong {
      @apply block leading-tight text-sm text-justify text-neutral-900 mb-3;
    }

    strong {
      @apply text-base font-semibold;
    }

    a {
      @apply text-neutral-900 underline cursor-pointer hover:bg-transparent;
    }
  }

  &__customisewrapper {
    @apply flex flex-col h-full;

    button {
      @apply flex-1 border-t p-3 leading-none mt-1;
    }
  }

  &__customise {
    @apply flex-shrink overflow-y-scroll;
  }

  &__customise__submit {
    @apply px-4 py-1 border-t mt-1;

    button {
      @apply custom-btn;
    }
  }

  &__customisebtn {
    @apply border-t p-5 px-4 leading-none flex justify-between cursor-pointer;
    @apply hover:bg-transparent;

    span {
      @apply font-semibold;
    }

    svg {
      @apply transition-all;
    }

    &.open {
      @apply border-t-0 border-b mt-0;

      svg {
        @apply rotate-180;
      }
    }

    &.open svg {
      @apply rotate-180;
    }
  }
}
</style>
