import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from '@/router'
import './style.css'
import App from './App.vue'
import Notifications from 'notiwind'
// Pinia
import { useRuntimeStore } from './stores/runtimeStore'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/authStore'

const initializeApp = async () => {
    const pinia = createPinia()
    createApp(App).use(pinia).use(router).use(Notifications).mount('#app')

    // Set config vars after app is initialized.
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const { refreshAccessToken } = useAuthStore()

    apiRoot.value = import.meta.env.VITE_API_ROOT
    await refreshAccessToken()
}

initializeApp()
