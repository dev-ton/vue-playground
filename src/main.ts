import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'

import '@/assets/main.css'

const app = createApp(App)

library.add(faBars, faXmark, faTrash)

app.use(createPinia())
app.use(router)

app.component('FaIcon', FontAwesomeIcon)

app.mount('#app')
