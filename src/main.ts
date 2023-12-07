import { createApp } from 'vue'
import CookieConsent from './CookieConsent.vue'

type cookieDetails = {
  name: string
  expires?: string | null
  description: string
}

type preferenceTypes = {
  functionality: boolean
  ad: boolean
  analytics: boolean
  personalization: boolean
  security: boolean
}

type cookieWindow = Window &
  typeof globalThis & {
    cookieConsent: {
      hide?: boolean
      title?: string
      description?: string
      cookiePolicy: null | string
      styling: {
        mode: ['light' | 'dark']
        buttonColor: string
      }
      settings: {
        [key in keyof preferenceTypes]: {
          title?: string
          essential?: boolean
          description: string
          cookies?: cookieDetails[]
        }
      }
    }
  }

export type { cookieWindow, preferenceTypes }

const data = (window as cookieWindow).cookieConsent

if (!data.hide) {
  const mountPoint = document.createElement('div')
  mountPoint.id = 'cookie-consent'
  document.body.append(mountPoint)

  createApp(CookieConsent, {
    data: data
  }).mount(mountPoint)
}
