import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const axiosAuth = axios.create({})
const max_retry = 3

axiosAuth.interceptors.request.use(
    (config) => {
        const auth = useAuthStore().$state
        // Ensure config is defined
        if (!config) {
            config = {}
        }

        // One min default timeout
        config.timeout = 60000

        if (auth.accessToken) {
            config.headers = config.headers || {}
            config.headers['Authorization'] = `Bearer ${auth.accessToken}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosAuth.interceptors.response.use(null, async (err) => {
    const { refreshAccessToken } = useAuthStore()

    // Check if the error is due to unauthorized access
    if (err.response && err.response.status === 401) {
        let retryCount = 0

        // Retry the request until the maximum number of attempts is reached
        while (retryCount < max_retry) {
            retryCount++

            // Attempt to refresh access token
            try {
                await refreshAccessToken()

                // Retry the original request
                return axiosAuth.request(err.config)
            } catch (error) {
                // If refreshing the token fails, log the error and continue retrying if possible
                console.error('Error refreshing access token:', error)
            }
        }
    }

    return Promise.reject(err)
})

export default axiosAuth
