import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosAuth from '@/utils/axiosAuth'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import { useInvoiceStore } from './invoiceStore'
import { useAccountStore } from './accountStore'
import { useProfileStore } from './profileStore'

export const useUserStore = defineStore('userStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const currentUser = ref({})
    const getCurrentUser = async (id) => {
        const { getInvoiceList } = useInvoiceStore()
        const { getAccountById } = useAccountStore()

        const { apiRoot } = storeToRefs(useRuntimeStore())
        axiosAuth
            .get(`${apiRoot.value}/profile/${id}`)
            .then(async (res) => {
                currentUser.value = res.data
                await getAccountById(res.data.accountId)
                await getInvoiceList()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(async () => {})
    }

    const updateUserProfile = async (selectedProfile) => {
        axiosAuth
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
