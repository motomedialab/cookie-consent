<script lang="ts" setup>
import type {PropType} from "vue";
import {computed, onBeforeMount, ref} from "vue";
import type {cookieWindow, preferenceTypes} from "@/main";
import ReopenConsent from "@/partials/ReopenConsent.vue";
import CustomiseItem from "@/partials/CustomiseItem.vue";

const props = defineProps({
    data: {
        type: Object as PropType<cookieWindow['cookieConsent']>,
        required: true,
    }
})

const customiseOpen = ref(false);
const preferencesExist = ref(false);
const preferences = ref({
    functionality: true,
    ad: true,
    analytics: true,
    personalization: true,
    security: true,
} as preferenceTypes);

// data attributes
const buttonColor = computed(() => props.data.styling.buttonColor || '#737373');

// define our customisation options
const customSettings = props.data!.settings;

const setPreferences = (values: { [key: string]: boolean }) => {

    let setValues = {} as preferenceTypes;

    Object.keys(preferences.value).forEach((key) => {
        setValues[key as keyof typeof preferences.value] = values[key] ?? false;
    });

    localStorage.setItem('cookieConsent', JSON.stringify(values));

    preferences.value = setValues;
    preferencesExist.value = true;

    setGtagConsent();
    resetState();
}

const setEssential = () => {
    let setValues = preferences.value;

    Object.keys(preferences.value).forEach((key) => {
        const typedKey = key as keyof preferenceTypes;
        setValues[typedKey] = customSettings[typedKey]?.essential ?? false;
    });

    setPreferences(setValues);
}

const acceptAll = () => {
    let setValues: { [key: string]: boolean } = {};

    Object.keys(preferences.value).forEach((key) => {
        setValues[key] = true;
    });

    setPreferences(setValues);
};

const setCustom = () => {
    setPreferences(preferences.value);
}

const resetState = () => {
    customiseOpen.value = false;
}

const setGtagConsent = (denied = false) => {

    let setValues: { [key: string]: string } = {};

    Object.keys(preferences.value).forEach((key) => {
        setValues[key + '_storage'] = !denied && preferences.value[key as keyof typeof preferences.value] ? 'granted' : 'denied';
    });
};

onBeforeMount(() => {

    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.gtag = () => dataLayer.push(arguments);

    const storedPreferences = localStorage.getItem('cookieConsent');

    if (storedPreferences) {
        preferences.value = JSON.parse(storedPreferences);
        preferencesExist.value = true;

        setGtagConsent();
    } else {
        // deny by default
        setGtagConsent(true);
    }
})
</script>

<template>
    <transition-group>

        <!-- Cookie Consent Overlays -->
        <template v-if="!preferencesExist">
            <div v-if="!preferencesExist" id="cookieconsent__overlay"></div>

            <!-- Outer Wrapper -->
            <div v-if="!preferencesExist" id="cookieconsent" :class="{'open' : customiseOpen}">

                <!-- Inner Wrapper -->
                <div id="cookieconsent__wrapper">

                    <!-- Consent Text -->
                    <div v-if="!customiseOpen" id="cookieconsent__content">

                        <strong>We use cookies</strong>

                        <p>
                            This website uses cookies in order to enhance your overall
                            user experience.
                        </p>

                        <p v-if="data.cookiePolicy">
                            Take a look at our <a id="cookieconsent__link" :href="data.cookiePolicy">cookie policy</a>
                            for more
                            information.
                        </p>

                        <button @click.prevent="setEssential">
                            Only essentials
                        </button>

                        <button @click.prevent="acceptAll">
                            Accept all
                        </button>
                    </div>

                    <!-- Customisation Text -->
                    <div id="cookieconsent__customisewrapper">

                        <a id="cookieconsent__customisebtn" :class="{'open' : customiseOpen}" href="#"
                           @click.prevent="customiseOpen = !customiseOpen">
                            <span>Customise</span>
                            <svg height="16" viewBox="0 0 448 512" width="14" xmlns="http://www.w3.org/2000/svg">
                                <!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.-->
                                <path
                                    d="M224 137.4l11.3 11.3 160 160L406.6 320 384 342.6l-11.3-11.3L224 182.6 75.3 331.3 64 342.6 41.4 320l11.3-11.3 160-160L224 137.4z"/>
                            </svg>
                        </a>

                        <div v-if="customiseOpen" id="cookieconsent__customise">

                            <ul>
                                <CustomiseItem
                                    v-for="(setting, type) in customSettings"
                                    v-model="preferences[type as keyof preferenceTypes]"
                                    :disabled="setting!.essential"
                                    :settings="customSettings"
                                    :type="type"
                                />
                            </ul>
                        </div>

                        <div v-if="customiseOpen" id="cookieconsent__customise__submit">
                            <button @click.prevent="setCustom">Save preferences</button>
                        </div>
                    </div>
                </div>

            </div><!-- /Outer Wrapper -->
        </template>

        <ReopenConsent v-else @click="preferencesExist = !preferencesExist"/>
    </transition-group>
</template>
<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

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
    @apply block mb-1 w-full cursor-pointer transition-opacity leading-none p-3 font-semibold text-white rounded bg-neutral-500;
    background-color: v-bind(buttonColor);

    &:hover, &:disabled {
        @apply opacity-80;
    }
}

#cookieconsent {

    --accent: v-bind(buttonColor);

    @apply fixed bottom-0 right-0 font-sans w-full sm:w-96 pb-0 text-neutral-900;
    @apply flex max-h-screen z-[999999];

    &__wrapper {
        @apply w-full sm:m-3 bg-white sm:rounded-lg shadow border border-gray-200 overflow-y-hidden;
    }

    &__overlay {
        @apply transition-all z-[999998] fixed top-0 left-0 w-full h-full bg-black opacity-20;
    }

    &__content {
        @apply p-4 pb-0;
    }

    &__content, &__customise {

        button {
            @apply custom-btn;
        }

        p, strong {
            @apply block leading-tight text-sm text-justify mb-3;
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
        @apply border-t mt-4 p-5 leading-none flex justify-between cursor-pointer;
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
