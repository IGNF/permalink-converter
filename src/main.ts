import '@gouvfr/dsfr/dist/core/core.main.min.css'
import '@gouvfr/dsfr/dist/component/component.main.min.css'
import '@gouvfr/dsfr/dist/utility/utility.main.min.css'
import '@gouvminint/vue-dsfr/styles'

import '@gouvfr/dsfr/dist/scheme/scheme.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createLogger } from 'vue-logger-plugin'

import { storePlugin } from 'pinia-plugin-store'

import App from './App.vue'
import router from './router/index'

import './main.css'

// https://vitejs.dev/guide/env-and-mode.html#node-env-and-modes
const isProduction = (import.meta.env.MODE === "production")


const logger = createLogger({
  enabled: true,
  level: isProduction ? 'error' : 'debug',
  callerInfo: true
})

const pinia = createPinia()

// INFO
// on enregistre les informations de connexion dans le localStorage
const store = storePlugin({
  stores: ['service'],
  storage: localStorage,
})
pinia.use(store)

const app = createApp(App);
app.use(pinia)
app.use(router)
app.use(logger)
app.mount('#app')