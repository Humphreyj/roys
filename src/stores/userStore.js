import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import { useInvoiceStore } from './invoiceStore'
import { useAccountStore } from './accountStore'
import { useProfileStore } from './profileStore'

export const useUserStore = defineStore('userStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())
    const { getInvoiceNumber, getInvoiceList } = useInvoiceStore()
    const { getAccountById } = useAccountStore()
    const currentUser = ref({})
    const getCurrentUser = async (id) => {
        const { apiRoot } = storeToRefs(useRuntimeStore())
        axios
            .get(`${apiRoot.value}/profile/${id}`)
            .then(async (res) => {
                currentUser.value = res.data
                await getAccountById(res.data.accountId)

                await getInvoiceNumber()
                await getInvoiceList()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const updateUserProfile = async (selectedProfile) => {
        axios
            .put(`${apiRoot.value}/profile/update`, selectedProfile)
            .then((res) => {})
            .catch((err) => {
                console.log(err)
            })
    }

    const actions = {
        getCurrentUser,
        updateUserProfile,
    }
    const values = {
        currentUser,
    }
    return { ...actions, ...values }
})
