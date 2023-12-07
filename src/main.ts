import {createApp} from 'vue'
import CookieConsent from './CookieConsent.vue'

type cookieWindow = Window &
    typeof globalThis & {
    cookieConsent: cookieConsent
}

export type {cookieWindow}

const data = (window as cookieWindow).cookieConsent

if (!data?.hide) {
    const mountPoint = document.createElement('div')
    mountPoint.id = 'cookie-consent'
    document.body.append(mountPoint)

    createApp(CookieConsent, {
        data: data
    }).mount(mountPoint)
}
