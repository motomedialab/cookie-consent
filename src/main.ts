import {createApp} from 'vue'
import CookieConsent from './CookieConsent.vue';

type cookieDetails = {
    name: string,
    expires?: string | null
    description: string,
};

type preferenceTypes = {
    functionality: boolean,
    ad: boolean,
    analytics: boolean,
    personalization: boolean,
    security: boolean,
};

type cookieWindow = Window & typeof globalThis & {
    cookieConsent: {
        mount: string,
        cookiePolicy: null | string,
        styling: {
            mode: ['light' | 'dark'],
            buttonColor: string,
        },
        settings: {
            [key in keyof preferenceTypes]: {
                essential?: boolean,
                description: string,
                cookies?: cookieDetails[]
            }
        }
    }
};

export type {cookieWindow, preferenceTypes};

const data = (window as cookieWindow).cookieConsent;

const mountPoint = document.querySelector(data?.mount);
if (mountPoint === null) {
    alert('Cookie consent is not configured!');
} else {
    createApp(CookieConsent, {
        data: data,
    }).mount(mountPoint)
}
