## Cookie Consent

A JavaScript consent script that interacts directly with Google Tag manager.

### Usage

window.cookieConsent must be defined at the top of the page, alongside creating the initial `gtag` method, before Tag
Manager is loaded.

```javascript
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments)
}

window.cookieConsent = {
    // optional flag to show/hide
    hide: false,

    // the title and description of the cookie consent banner
    title: 'We use cookies',
    description: 'Our website uses cookies to improve your experience. In compliance with EU laws, we need to know if you agree to our use of cookies.',

    // optional link to privacy policy
    cookiePolicy: '/privacy',

    // ability to change basic styling options
    styling: {
        buttonColor: '#FF0000',
    },

    // per cookie settings. This gives the ability to customise the cookie settings
    settings: {
        functionality: {
            // whether the preference is essential
            essential: true,
            // a description of what this block is for
            description: 'There are some cookies that we have to include in order for certain web pages to function. For this reason, they do not require your consent.',
            // the cookies that are set with this preference
            cookies: [
                {
                    // the cookie name
                    name: 'laravel_session',
                    // the cookie expiry
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
        }
    }
}
```

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
```