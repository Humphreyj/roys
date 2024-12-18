import { ref } from 'vue'
import { defineStore } from 'pinia'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import { useUserStore } from './userStore'

// Routing
import router from '@/router'

// Utils
import axiosAuth from '@/utils/axiosAuth'
import { useNotify } from '@/utils/notificationUtils'

export const useAccountStore = defineStore('accountStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const currentAccount = ref({
        primaryContact: '',
        companyName: '',
        companyAddress: {},
        companyPhone: '',
        companyEmail: '',
        billingInfo: {},
    })

    const editingCurrentAccount = ref(false)

    const getAccountById = async (id) => {
        axiosAuth
            .get(`${apiRoot.value}/account/${id}`)
            .then(async (res) => {
                currentAccount.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createPrimaryContact = async (newUser) => {
        const { apiRoot } = storeToRefs(useRuntimeStore())
        const { currentUser } = storeToRefs(useUserStore())

        axiosAuth
            .post(`${apiRoot.value}/profile/create`, newUser)
            .then(async (res) => {
                currentUser.value = res.data
                currentAccount.value.primaryContact = currentUser.value.id
                await createAccount(currentAccount.value)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createAccount = async (newAccount) => {
        const { currentUser } = storeToRefs(useUserStore())
        const { updateUserProfile } = useUserStore()

        newAccount.primaryContact = currentUser.value.id
        axiosAuth
            .post(`${apiRoot.value}/account/create`, newAccount)
            .then(async (res) => {
                currentAccount.value = res.data
                currentUser.value.accountId = currentAccount.value.id
                await updateUserProfile(currentUser.value)
                useNotify('success', 'Success', 'Account Created.', 4000)

                router.push({
                    name: 'Account Details',
                    params: { id: currentAccount.value.id },
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const updateAccount = async (updatedAccount) => {
        let id = updatedAccount.id
        axiosAuth
            .put(`${apiRoot.value}/account/update/${id}`, updatedAccount)
            .then((res) => {
                currentAccount.value = res.data

                useNotify(
                    'success',
                    'Account Updated',
                    'Account details have been updated.',
                    4000
                )
                editingCurrentAccount.value = false
            })
            .catch((err) => {
                console.log(err)
                useNotify(
                    'error',
                    'Error',
                    'There was an error updating the account.',
                    4000
                ) // 4s
            })
    }

    const actions = {
        createPrimaryContact,
        createAccount,
        getAccountById,
        updateAccount,
    }
    const values = {
        currentAccount,
        editingCurrentAccount,
    }
    return { ...actions, ...values }
})
