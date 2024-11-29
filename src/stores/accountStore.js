import { ref } from 'vue'
import { defineStore } from 'pinia'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import { useUserStore } from './userStore'

// Routing
import router from '@/router'
import axios from 'axios'
// Utils

export const useAccountStore = defineStore('accountStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const currentAccount = ref()
    const checkStoredAccount = async () => {
        const { getCurrentUser } = useUserStore()
        const { currentAccount } = storeToRefs(useAccountStore())
        let accountData = localStorage.getItem('accountData')
        if (accountData) {
            currentAccount.value = JSON.parse(accountData)
            await getCurrentUser(currentAccount.value.primaryContact)
        }
    }

    const getAccountById = async (id) => {
        const { getCurrentUser } = useUserStore()
        axios
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

        axios
            .post(`${apiRoot.value}/profile/create`, newUser)
            .then(async (res) => {
                currentUser.value = res.data
                currentAccount.value.primaryContact = currentUser.value.id
                await createAccount(currentAccount.value)
                // currentUser.value.accountId = currentAccount.value.id

                // await updateUserProfile(currentUser.value)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createAccount = async (newAccount) => {
        const { currentUser } = storeToRefs(useUserStore())
        const { getCurrentUser, updateUserProfile } = useUserStore()

        newAccount.primaryContact = currentUser.value.id
        axios
            .post(`${apiRoot.value}/account/create`, newAccount)
            .then(async (res) => {
                currentAccount.value = res.data
                console.log('currentAccount', currentAccount.value)
                // if (!currentUser.value) {
                //     await getCurrentUser(newAccount.primaryContact)
                // }
                currentUser.value.accountId = currentAccount.value.id
                await updateUserProfile(currentUser.value)

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
        axios
            .put(`${apiRoot.value}/account/update/${id}`, updatedAccount)
            .then((res) => {
                currentAccount.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const actions = {
        createPrimaryContact,
        createAccount,
        getAccountById,
        updateAccount,
        checkStoredAccount,
    }
    const values = {
        currentAccount,
    }
    return { ...actions, ...values }
})
