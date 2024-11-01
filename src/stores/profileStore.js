import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
// Mock Data
import { userProfileMocks } from './mockData'
import { v4 as uuidv4 } from 'uuid'

export const useProfileStore = defineStore('profiles', () => {
    const selectedUser = ref(null)
    const userProfiles = ref(userProfileMocks)
    const currentUser = ref('c847868d-dffb-4d1e-a385-74dd578c46a7')
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const handleUserSelect = (user) => {
        selectedUser.value = user
    }

    const getProfileList = () => {
        axios
            .get(`${apiRoot.value}/profile`)
            .then((res) => {
                userProfiles.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getProfileById = (id) => {
        axios
            .get(`${apiRoot.value}/profile/${id}`)
            .then((res) => {
                selectedUser.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createNewProfile = (newUser) => {
        newUser.id = uuidv4()
        userProfiles.value.unshift(newUser)

        axios
            .post(`${apiRoot.value}/profile/create`, newUser)
            .then((res) => {
                res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const updateSelectedProfile = (selectedProfile) => {
        axios
            .put(`${apiRoot.value}/profile/update`, selectedProfile)
            .then((res) => {})
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteSelectedProfile = (id) => {
        axios
            .delete(`${apiRoot.value}/profile/delete/${id}`)
            .then((res) => {})
            .catch((err) => {
                console.log(err)
            })
    }

    const actions = {
        createNewProfile,
        handleUserSelect,
        getProfileById,
        updateSelectedProfile,
        getProfileList,
        deleteSelectedProfile,
    }
    const values = {
        selectedUser,
        userProfiles,
        currentUser,
    }
    return { ...actions, ...values }
})
