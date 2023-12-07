## Cookie Consent

A flexible, highly configurable, mobile friendly, drop in JavaScript consent script that interacts directly with Google
Tag
manager `Consent Overview`.

Built with EU cookie consent and the dreaded GDPR standards in mind!

| Widget View                                                                                                          | Customise Preferences                                                                                                                  |
|----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| ![Example widget](https://mtcm-public.s3.eu-west-2.amazonaws.com/packages/%40motomedialab/cookie-consent/widget.png) | ![Example widget expanded](https://mtcm-public.s3.eu-west-2.amazonaws.com/packages/%40motomedialab/cookie-consent/widget-expanded.png) |

### Installation

#### NPM

`npm install @motomedialab/cookie-consent --save`

```javascript
// the script must be imported as a module and loaded once gtag & window preferences have been defined
import '@motomedialab/cookie-consent';
```

#### CDN

`<script src="https://cdn.jsdelivr.net/npm/@motomedialab/cookie-consent@latest" type="module"></script>`

### Implementing with Google Tag Manager

There is a little pre-work as detailed in the example code below. Once installed, the script will automatically apply
the Tag Manager consent settings, and will emit a `cookieConsent` event when these preferences are changed.

However, you still need to configure your tag to
use [Consent Overview](https://support.google.com/tagmanager/answer/10718549?hl=en)

Once this is done, you can then create a custom event *trigger* in Tag Manager to listen for this event, and use it to
fire your *tags*,
based on the users consent level.

![TagManager Trigger](https://mtcm-public.s3.eu-west-2.amazonaws.com/packages/%40motomedialab/cookie-consent/trigger.png)

You can then add your newly created trigger to as a firing trigger for each event and configure each tag according to
the required consent level:

![TagManager Triggering](https://mtcm-public.s3.eu-west-2.amazonaws.com/packages/%40motomedialab/cookie-consent/triggering.png)

### Example

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

            // initialise tag manager
            (function (w, d, s, l, i) {
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
            })(window, document, 'script', 'dataLayer', window.gtmId);
</script>
<script type="module" src="https://cdn.jsdelivr.net/npm/@motomedialab/cookie-consent@latest/dist/index.js"></script>
```

### Configuration

Below is a full configuration example, with all available options:

```javascript
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments)
}

window.cookieConsent = {
    // flag to show/hide for the current page (optional)
    hide: false,

    // the title and description of the cookie consent banner (both optional)
    title: 'We use cookies',
    description: 'Our website uses cookies to improve your experience. In compliance with EU laws, we need to know if you agree to our use of cookies.',

    // link to privacy policy (optional)
    cookiePolicy: '/privacy',

    // ability to change basic styling options
    styling: {
        buttonColor: '#FF0000',
    },

    // per cookie settings. This gives the ability to customise the cookie settings
    // these are in five categories, ad, analytics, functionality, personalization & security
    settings: {
        functionality: {
            // title of the cookie group (optional, will be auto calculated by default)
            title: 'Functionality Cookies',
            // whether the preference is essential and cannot be turned off (optional)
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