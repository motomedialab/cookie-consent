interface cookieConsent {
  hide?: boolean
  anchor: null | string
  cookiePolicy: null | string
  text: {
    reopen: string
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
    buttonColor: string,
    position: string
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
