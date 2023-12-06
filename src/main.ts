import './assets/main.css';

type cookieWindow = Window & typeof globalThis & {
    cookieConsent: {
        mount: string,
        cookiePolicy: null|string,
    }
};

export type {cookieWindow};

const data = (window as cookieWindow).cookieConsent;

import { createApp } from 'vue'
import CookieConsent from './CookieConsent.vue'

const mountPoint = document.querySelector(data.mount as string);
if (mountPoint === null) {
    alert('Cookie consent is not configured!');
} else {
    createApp(CookieConsent, {
        data: data,
    }).mount(mountPoint)
}
