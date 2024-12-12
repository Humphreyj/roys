import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import { useAccountStore } from './accountStore'
import { useUserStore } from './userStore'
// Routing
import router from '@/router'
// Utils
import { useStorage } from '@vueuse/core'

const authData = ref({
    email: '',
    password: '',
})

export const useAuthStore = defineStore('authStore', (email) => {
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const userLogin = async (email, password) => {
        const { currentAccount } = storeToRefs(useAccountStore())
        const { getAccountById } = useAccountStore()
        const { getCurrentUser } = useUserStore()
        const { currentUser } = storeToRefs(useUserStore())
        axios
            .post(`${apiRoot.value}/auth/login`, authData.value)
            .then(async (res) => {
                if (!res.data.primaryContact) {
                    currentUser.value = res.data
                    console.log(
                        'loggin in with user, fetch account',
                        currentUser.value
                    )
                    await getAccountById(currentUser.value.accountId)
                } else {
                    currentAccount.value = res.data
                    console.log(
                        'loggin in with account, fetch user',
                        currentAccount.value
                    )
                    await getCurrentUser(currentAccount.value.primaryContact)

                    console.log('current user', currentUser.value)
                }
                localStorage.setItem(
                    'accountData',
                    JSON.stringify(currentAccount.value)
                )
                router.push({ name: 'Dashboard' })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const logout = async () => {
        localStorage.removeItem('accountData')
    }

    const actions = { userLogin, logout }
    const values = { authData }
    return { ...actions, ...values }
})
