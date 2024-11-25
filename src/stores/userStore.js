import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'

export const useUserStore = defineStore('userStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())
    const currentUser = ref({})
    const getCurrentUser = async (id) => {
        const { apiRoot } = storeToRefs(useRuntimeStore())
        axios
            .get(`${apiRoot.value}/profile/${id}`)
            .then((res) => {
                currentUser.value = res.data[0]
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
