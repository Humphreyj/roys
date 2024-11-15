import { ref } from 'vue'
import { defineStore } from 'pinia'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import { useUserStore } from './userStore'
// Routing
import router from '@/router'
import axios from 'axios'

export const useAccountStore = defineStore('accountStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const currentAccount = ref({
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

        subscriptionPlan: '',
        billingInfo: {
            taxRate: {
                label: '8.25%',
                value: 0.0825,
            },
        },
    })

    const getAccountById = async (id) => {
        axios
            .get(`${apiRoot.value}/account/${id}`)
            .then((res) => {
                currentAccount.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createPrimaryContact = async (newUser) => {
        // newUser.id = uuidv4()

        const { currentUser } = storeToRefs(useUserStore())
        axios
            .post(`${apiRoot.value}/profile/create`, newUser)
            .then(async (res) => {
                currentUser.value = res.data
                currentAccount.value.primaryContact = currentUser.value
                await createAccount(currentAccount.value)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createAccount = async (newAccount) => {
        const { currentUser } = storeToRefs(useUserStore())
        newAccount.primaryContact = currentUser.value.id
        console.log('req,', newAccount)
        axios
            .post(`${apiRoot.value}/account/create`, newAccount)
            .then((res) => {
                console.log(res.data)
                // currentUser.value = res.data
                currentAccount.value = res.data
                currentAccount.value.primaryContact = currentUser.value
                router.push({
                    name: 'Account Details',
                    params: { id: currentAccount.value.id },
                })

                // console.log(currentAccount.value)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const actions = { createPrimaryContact, createAccount, getAccountById }
    const values = {
        currentAccount,
    }
    return { ...actions, ...values }
})
