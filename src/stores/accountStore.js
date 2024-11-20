import { ref } from 'vue'
import { defineStore } from 'pinia'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import { useUserStore } from './userStore'
import { useProfileStore } from './profileStore'
// Routing
import router from '@/router'
import axios from 'axios'

export const useAccountStore = defineStore('accountStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const currentAccount = ref({
        companyAddress: {
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            zip: '',
        },
    })

    const getAccountById = async (id) => {
        const { getCurrentUser } = useUserStore()
        axios
            .get(`${apiRoot.value}/account/${id}`)
            .then(async (res) => {
                console.log('res', res.data)
                currentAccount.value = res.data

                await getCurrentUser(currentAccount.value.primaryContact)
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
    }
    const values = {
        currentAccount,
    }
    return { ...actions, ...values }
})
