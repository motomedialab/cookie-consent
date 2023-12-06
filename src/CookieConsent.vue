<script setup lang="ts">
import type {PropType} from "vue";
import type {cookieWindow} from "@/main";
import {ref} from "vue";

defineProps({
    data: {
        type: Object as PropType<cookieWindow['cookieConsent']>,
        required: true,
    }
})

const customiseOpen = ref(false);

</script>

<template>

    <div id="cookieconsent__overlay"></div>

    <div id="cookieconsent" :class="{'open' : customiseOpen}">

        <div id="cookieconsent__wrapper">

            <div id="cookieconsent__content" v-if="!customiseOpen">

                <strong>We use cookies</strong>

                <p>
                    This website uses cookies in order to enhance your overall
                    user experience.
                </p>

                <p v-if="data.cookiePolicy">
                    Take a look at our <a :href="data.cookiePolicy" id="cookieconsent__link">cookie policy</a> for more information.
                </p>

                <button>
                    Only essentials
                </button>

                <button>
                    Accept all
                </button>
            </div>

            <div id="cookieconsent__customisewrapper">

                <a href="#" id="cookieconsent__customisebtn" :class="{'open' : customiseOpen}" @click.prevent="customiseOpen = !customiseOpen">
                    <span>Customise</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                        <!--!Font Awesome Pro 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.-->
                        <path
                            d="M224 137.4l11.3 11.3 160 160L406.6 320 384 342.6l-11.3-11.3L224 182.6 75.3 331.3 64 342.6 41.4 320l11.3-11.3 160-160L224 137.4z"/>
                    </svg>
                </a>

                <div id="cookieconsent__customise" v-if="customiseOpen">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius enim explicabo harum perspiciatis,
                        porro quibusdam temporibus veritatis voluptates! Aperiam assumenda eveniet ipsa laborum modi nihil
                        perspiciatis provident repudiandae saepe, voluptatem?</p>
                    <p>Amet enim explicabo, fuga iste minus porro quam quod ut? Accusantium atque blanditiis dolorem,
                        ducimus magni nobis, nostrum perspiciatis praesentium quae, quam quibusdam quos reiciendis rerum
                        sunt ullam veniam voluptatem!</p>
                    <p>Alias blanditiis deleniti eligendi, excepturi iste maiores modi nobis non officia perferendis
                        perspiciatis qui recusandae saepe sapiente, sit soluta unde voluptatibus. Asperiores atque ex
                        excepturi necessitatibus numquam temporibus totam voluptatem!</p>
                    <p>Fugit ipsam ipsum molestiae unde! Accusamus alias architecto commodi cumque eligendi esse et eum
                        fugiat iusto, magnam non officiis perferendis quidem, sint velit veritatis voluptatum. Enim esse
                        maxime numquam sequi!</p>
                    <p>Adipisci architecto asperiores beatae culpa dicta eum molestiae tempora. Amet esse ipsum labore. Ab
                        amet aut consequatur corporis culpa esse eveniet illum incidunt, iure maiores numquam placeat rerum
                        temporibus voluptatum!</p>

                    <p>Adipisci architecto asperiores beatae culpa dicta eum molestiae tempora. Amet esse ipsum labore. Ab
                        amet aut consequatur corporis culpa esse eveniet illum incidunt, iure maiores numquam placeat rerum
                        temporibus voluptatum!</p>
                </div>

                <div id="cookieconsent__customise__submit" v-if="customiseOpen">
                    <button>Save preferences</button>
                </div>



            </div>

        </div>
    </div>
</template>

<style>

</style>

<style lang="scss" scoped>

@tailwind base;
@tailwind components;
@tailwind utilities;

.custom-btn {
    @apply block mb-1 w-full cursor-pointer bg-opacity-90 transition-colors leading-none p-3 font-semibold text-white rounded bg-neutral-500;

    &:hover, &:disabled {
        @apply bg-opacity-100;
    }
}


#cookieconsent {
    @apply fixed bottom-0 right-0 w-80 pb-0 text-neutral-900;
    @apply flex max-h-screen z-[999999];

    &__wrapper {
        @apply m-3 bg-white rounded-lg shadow border border-gray-200 overflow-y-hidden;
    }

    &__overlay {
        @apply z-[999998] fixed top-0 left-0 w-full h-full bg-black opacity-10;
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
        @apply p-4 flex-shrink overflow-y-scroll;
    }

    &__customise__submit {

        @apply px-4 py-1 border-t mt-1;

        button {
            @apply custom-btn;
        }
    }

    &__customisebtn {
        @apply border-t mt-4 p-4 leading-none flex justify-between cursor-pointer;
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
