interface cookieConsent {
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