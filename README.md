## Cookie Consent

A flexible, highly configurable, mobile friendly, drop in JavaScript consent script that interacts directly with Google
Tag
manager [Consent Overview](https://support.google.com/tagmanager/answer/10718549?hl=en).

Built with EU cookie consent and the dreaded GDPR standards in mind!

![Example Widget](https://mtcm-public.s3.eu-west-2.amazonaws.com/packages/%40motomedialab/cookie-consent/recording.gif)

### Installation

#### NPM

`npm install @motomedialab/cookie-consent --save`

```javascript
// import the module within your javascript
// this must be done after configuring tag manager and options
import '@motomedialab/cookie-consent';
```

#### CDN

```html

<script src="https://cdn.jsdelivr.net/npm/@motomedialab/cookie-consent@latest" type="module"></script>
```

### Configuring Google Tag Manager

There is a little pre-work as detailed in the example code below. Once installed, the script will automatically apply
the Tag Manager consent settings, and will emit a `cookieConsent` event to Tag Manager when these preferences
are initialised/changed.

If you haven't done so already, you need to enable 'Consent Overview' in your Tag Manager account. This can be found
within Admin > Container Settings > Additional Settings

![Enable Consent Overview](https://mtcm-public.s3.eu-west-2.amazonaws.com/packages/%40motomedialab/cookie-consent/enable-consent-overview.png)

For information on configuring Tag Manager for Consent Overview, see the
documentation: [Consent Overview](https://support.google.com/tagmanager/answer/10718549?hl=en)

Once this is done, you can then create a custom event *trigger* in Tag Manager to listen for this event, and use it to
fire your *tags*, based on the users consent level.

![TagManager Trigger](https://mtcm-public.s3.eu-west-2.amazonaws.com/packages/%40motomedialab/cookie-consent/trigger.png)

You can then add your newly created trigger to as a firing trigger for each event and configure each tag according to
the required consent level:

![TagManager Triggering](https://mtcm-public.s3.eu-west-2.amazonaws.com/packages/%40motomedialab/cookie-consent/triggering.png)

That's it, your Tag Manager should now be ready! Make sure to test your configuration in Preview Mode before publishing
your changes.

### JavaScript implementation

```html

<script>
    window.gtmId = 'GTM-XXXXXXX';
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments)
    }

    // configure our cookie consent
    window.cookieConsent = {
        cookiePolicy: '/privacy',
        styling: {
            buttonColor: '#333',
            position: 'right'
        },

        settings: {
            functionality: {
                essential: true,
                description: 'There are some cookies that we have to include in order for certain web pages to function. For this reason, they do not require your consent.',
                cookies: [
                    {
                        name: 'laravel_session',
                        expires: '2 hours',
                        description: 'This cookie is used to identify your unique session on the website.',
                    },
                ]
            },
            analytics: {
                description: 'We use these for internal research on how we can improve the service we provide for all our users. These cookies assess how you interact with our website.',
                cookies: [
                    {
                        name: '_ga, _ga_*',
                        expires: '2 years',
                        description: 'This cookie is used by Google Analytics to distinguish unique users by assigning a randomly generated number as a client identifier. It is included in each page request in a site and used to calculate visitor, session and campaign data for the sites analytics reports.',
                    },
                    {
                        name: 'initialReferer',
                        expires: '5 days',
                        description: 'We store the initial referer in a cookie to help us understand how users find our website.'
                    }
                ]
            },
        }
    }
</script>
<!-- Google Tag Manager -->
<script>(function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start':
                new Date().getTime(), event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', window.gtmId);</script>
<!-- End Google Tag Manager -->

<!-- Cookie Consent Script -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@motomedialab/cookie-consent@latest/dist/index.js"></script>
```

### Configuration

Below is a full configuration example, with all available options:

```javascript
window.cookieConsent = {
    // flag to show/hide for the current page (optional)
    hide: false,

    // default text values, these can be overriden if necessary
    text: {
        title: 'We use cookies',
        description: 'This website uses cookies in order to enhance your overall user experience.',
        cookiePolicy: 'Choose from the options below to manage your cookie preferences. :link(Click here) to read our cookie/privacy policy.',
        buttons: {
            onlyEssentials: 'Only essentials',
            acceptAll: 'Accept all',
            customise: 'Customise',
            savePreferences: 'Save preferences',
        }
    },

    // link to privacy policy (optional, hides link if not defined)
    cookiePolicy: '/privacy',
    
    // instead of showing in the corner, you can specify a link with an href
    // of the below anchor that we'll listen for clicks on. E.g. <a href="#cookie-consent">Privacy Policy</a>
    anchor: '#cookie-consent',

    // ability to change basic styling options
    styling: {
        buttonColor: '#FF0000', // defaults to grey
        position: 'right' // defaults to right side
    },

    // per cookie settings. This gives the ability to customise the cookie settings
    // these are in five categories, ad, analytics, functionality, personalization & security
    // and you can have one, none, all or some of these categories
    settings: {
        functionality: {
            // title of the cookie group (optional, will be auto calculated by default)
            title: 'Functionality Cookies',
            // whether the preference is essential and cannot be turned off (optional, false by default)
            essential: true,
            // a description of what this block is for
            description: 'There are some cookies that we have to include in order for certain web pages to function. For this reason, they do not require your consent.',
            // an array of cookies that are set with this preference
            cookies: [
                {
                    // the cookie name
                    name: 'laravel_session',
                    // the cookie expiry (optional)
                    expires: '2 hours',
                    // the cookie usage description
                    description: 'This cookie is used to identify your unique session on the website.',
                },
            ]
        },
        security: {
            essential: true,
            description: 'We use these cookies to help identify and prevent potential security risks. For this reason, they do not require your consent.',
            cookies: [
                {
                    name: 'XSRF-TOKEN',
                    expires: '2 hours',
                    description: 'This cookie is used to prevent cross-site request forgery (CSRF) attacks.',
                },
            ]
        },
        analytics: {
            description: 'We use these for internal research on how we can improve the service we provide for all our users. These cookies assess how you interact with our website.',
            cookies: [
                {
                    name: '_ga, _ga_*',
                    expires: '2 years',
                    description: 'This cookie is used by Google Analytics to distinguish unique users by assigning a randomly generated number as a client identifier. It is included in each page request in a site and used to calculate visitor, session and campaign data for the sites analytics reports.',
                },
                {
                    name: 'initialReferer',
                    expires: '5 days',
                    description: 'We store the initial referer in a cookie to help us understand how users find our website.'
                }
            ]
        },
        ad: {
            title: 'Ads data',
            description: 'We use Google Ads to measure the performance of our advertising campaigns and to provide advertising based on visitors\' interests. We do not use cookies to collect personal information.',
            // if no cookies are provided, a 'more details' option will be hidden for this preference
        },
        personalization: {
            // personalization storage options, with nothing defined it'll simply show as 'Personalization cookies' with a toggle
        }
    }
}
```