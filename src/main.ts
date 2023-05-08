import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as Sentry from '@sentry/vue'

import App from '@/App.vue'
import router from '@/router'

import { Inkline, components } from '@inkline/inkline'
import '@inkline/inkline/inkline.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faMoon, faPowerOff, faSun, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

import '@/assets/main.scss'

const app = createApp(App)

library.add(faBars, faXmark, faTrash, faMoon, faSun, faPowerOff)

Sentry.init({
  app,
  dsn: 'https://31180f5155c64106ac44f1982b2ed02b@o4505148813541376.ingest.sentry.io/4505148818456576',
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

app.use(createPinia())
app.use(router)

app.use(Inkline, {
  components,
})

app.component('FaIcon', FontAwesomeIcon)

app.mount('#app')
