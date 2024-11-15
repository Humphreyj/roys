import { ref } from 'vue'
import { defineStore } from 'pinia'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import axios from 'axios'

export const useSettingsStore = defineStore('settingsStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())
    const userSettings = ref({
        id: '859e61ab-3b88-4750-98b8-c78f9a6b22f4',
        companyName: `Roy's Repairs`,
        phone: '512-984-4582',
        email: 'contact@roys.com',
        company_address: {
            address_line_1: `123 Roy's Rd`,
            address_line_2: '210',
            city: 'Testville',
            state: 'tx',
            zip: '44343',
        },
        primary_contact: 'f541357d-9d69-11ef-8bf2-0242ac140003',
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
