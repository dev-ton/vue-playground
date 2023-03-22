import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import { Inkline, components } from '@inkline/inkline'
import '@inkline/inkline/inkline.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faMoon, faSun, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

import '@/assets/main.scss'

const app = createApp(App)

library.add(faBars, faXmark, faTrash, faMoon, faSun)

app.use(createPinia())
app.use(router)

app.use(Inkline, {
  components,
})

app.component('FaIcon', FontAwesomeIcon)

app.mount('#app')
