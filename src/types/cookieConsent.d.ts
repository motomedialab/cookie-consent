interface cookieConsent {
  hide?: boolean
  cookiePolicy: null | string
  text: {
    title: string
    description: string
    cookiePolicy: string
    buttons: {
      onlyEssentials: string
      acceptAll: string
      customise: string
      savePreferences: string
    }
  }
  styling: {
    buttonColor: string
  }
  settings?: {
    [key in keyof preferenceTypes]: {
      title?: string
      essential?: boolean
      description: string
      cookies?: cookieDetails[]
    }
  }
}
