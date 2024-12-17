import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import { useAccountStore } from './accountStore'
import { useUserStore } from './userStore'
// Routing
import router from '@/router'
// Utils
import { notify } from 'notiwind'

const authData = ref({
    email: '',
    password: '',
})

export const useAuthStore = defineStore('authStore', (email) => {
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const accessToken = ref(localStorage.getItem('accessToken') || null)
    const refreshToken = ref(localStorage.getItem('refreshToken') || null)
    const tokenExpiresAt = ref(null)
    const tokenRefreshTimeoutId = ref(null)

    const isAuthenticated = computed(() => {
        return checkRefreshToken()
    })

    const setAccessTokens = (data, expiresAt) => {
        accessToken.value = data.accessToken
        refreshToken.value = data.refreshToken
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        tokenExpiresAt.value = expiresAt
    }

    const clearAccessTokens = () => {
        accessToken.value = null
        tokenExpiresAt.value = null
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }

    const checkRefreshToken = () => {
        try {
            if (refreshToken.value) {
                const decodedRefreshToken = jwtDecode(refreshToken.value)
                const currentTime = Math.floor(Date.now() / 1000)
                if (currentTime > decodedRefreshToken.exp) {
                    logout()
                    return false
                } else {
                    return true
                }
            }
        } catch (error) {
            console.log('Error checking refresh token:', error.message)
        }
    }

    const refreshAccessToken = async () => {
        const { getCurrentUser } = useUserStore()
        if (!refreshToken.value && !accessToken.value) {
            return
        }
        axios
            .post(`${apiRoot.value}/auth/refresh-token`, {
                refreshToken: refreshToken.value,
            })
            .then(async (res) => {
                setAccessTokens(
                    res.data,
                    jwtDecode(res.data.accessToken).exp * 1000
                )
                const userToken = jwtDecode(res.data.accessToken)
                await getCurrentUser(userToken.id)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const userLogin = async (email, password) => {
        const { getAccountById } = useAccountStore()

        const { currentUser } = storeToRefs(useUserStore())
        axios
            .post(`${apiRoot.value}/auth/login`, authData.value)
            .then(async (res) => {
                authData.value = { email: '', password: '' }
                currentUser.value = res.data

                setAccessTokens(
                    res.data,
                    jwtDecode(res.data.accessToken).exp * 1000
                )
                // jwtDecode(res.data.accessToken)
                await getAccountById(res.data.accountId)

                router.push({ name: 'Dashboard' })
            })
            .catch((err) => {
                notify(
                    {
                        group: 'error',
                        title: 'Error',
                        text: err.response.data,
                    },
                    4000
                ) // 4s
            })
    }

    const logout = () => {
        const { currentUser } = storeToRefs(useUserStore())
        axios
            .post(`${apiRoot.value}/auth/logout`, { id: currentUser.value.id })
            .then(async (res) => {
                clearAccessTokens()
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const actions = { userLogin, logout, refreshAccessToken }
    const values = { authData, isAuthenticated }
    return { ...actions, ...values }
})
