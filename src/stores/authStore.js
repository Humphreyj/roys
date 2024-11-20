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

const authData = ref({
    email: '',
    password: '',
})

export const useAuthStore = defineStore('authStore', (email) => {
    const { apiRoot } = storeToRefs(useRuntimeStore())
    const { currentAccount } = storeToRefs(useAccountStore())
    const { getCurrentUser } = useUserStore()
    const { currentUser } = storeToRefs(useUserStore())

    const userLogin = async (email, password) => {
        axios
            .post(`${apiRoot.value}/auth/login`, authData.value)
            .then(async (res) => {
                console.log(res.data)
                if (!res.data.primaryContact) {
                    currentUser.value = res.data
                } else {
                    currentAccount.value = res.data
                    await getCurrentUser(currentAccount.value.primaryContact)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const actions = { userLogin }
    const values = { authData }
    return { ...actions, ...values }
})
