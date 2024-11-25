import { ref } from 'vue'
import { defineStore } from 'pinia'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import axios from 'axios'

export const useSettingsStore = defineStore('settingsStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())
    const userSettings = ref({
        companyName: ``,
        phone: '',
        email: '',
        companyAddress: {
            address_line_1: ``,
            address_line_2: '',
            city: '',
            state: '',
            zip: '',
        },
        primaryContact: null,
        taxRate: {
            label: '8.25%',
            value: 0.0825,
        },
        subscription: '',
    })
    const nextInvoiceNumber = ref(null)

    const getUserSettings = async () => {
        axios
            .get(`${apiRoot.value}/settings`)
            .then((res) => {
                console.log(res.data)
                nextInvoiceNumber.value = res.data
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
