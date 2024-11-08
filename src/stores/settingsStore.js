import { ref } from 'vue'
import { defineStore } from 'pinia'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import axios from 'axios'

export const useSettingsStore = defineStore('settingsStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())
    const userSettings = ref({
        nextInvoiceNumber: null,
    })

    const getUserSettings = async () => {
        axios
            .get(`${apiRoot.value}/settings`)
            .then((res) => {
                console.log(res.data)
                userSettings.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const actions = { getUserSettings }
    const values = {
        userSettings,
    }
    return { ...actions, ...values }
})
