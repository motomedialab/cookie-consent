import { createApp } from 'vue'
import CookieConsent from './CookieConsent.vue'

function deepMerge(a: any, b: any) {
  const result = {}
  for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
    // @ts-ignore
    result[key] =
      a[key]?.constructor === Object && b[key]?.constructor === Object
        ? deepMerge(a[key], b[key])
        : structuredClone(b[key] !== undefined ? b[key] : a[key])
  }
  return result
}

type cookieWindow = Window &
  typeof globalThis & {
    cookieConsent?: cookieConsent
  }

// @ts-ignore: will always translate to a cookieConsent object
const data: cookieConsent = deepMerge(
  {
    cookiePolicy: null,
    text: {
      title: 'We use cookies',
      description: 'This website uses cookies in order to enhance your overall user experience.',
      cookiePolicy:
        'Choose from the options below to manage your cookie preferences. :link(Click here) to read our cookie/privacy policy.',
      buttons: {
        onlyEssentials: 'Only essentials',
        acceptAll: 'Accept all',
        customise: 'Customise',
        savePreferences: 'Save preferences'
      }
    },
    styling: {
      buttonColor: '#737373'
    }
  } as cookieConsent,
  (window as cookieWindow).cookieConsent ?? {}
)

if (typeof data === 'undefined') {
  'console' in window &&
    console.warn(
      '🚨 Cookie Consent is not configured, create a window.cookieConsent' +
        ' object with the required configuration (see https://www.npmjs.com/package/@motomedialab/cookie-consent).'
    )
}

if (typeof data !== 'undefined' && !data.hide) {
  const mountPoint = document.createElement('div')
  mountPoint.style.position = 'relative'
  mountPoint.style.zIndex = '999995'
  document.body.append(mountPoint)

  createApp(CookieConsent, {
    data: data
  }).mount(mountPoint)
}
