import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// Mock Data
import { userProfileMocks } from './mockData'
import { v4 as uuidv4 } from 'uuid'

export const useProfileStore = defineStore('profiles', () => {
    const selectedUser = ref(null)
    const userProfiles = ref(userProfileMocks)
    const currentUser = ref('c847868d-dffb-4d1e-a385-74dd578c46a7')

    const handleUserSelect = (user) => {
        selectedUser.value = user
    }

    const getProfileList = () => {
        axios
            .get('http://127.0.0.1:8080/api/profile')
            .then((res) => {
                userProfiles.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getProfileById = (id) => {
        let found = userProfiles.value.find((profile) => profile.id === id)
        selectedUser.value = found
    }

    const createNewProfile = (newUser) => {
        newUser.id = uuidv4()
        userProfiles.value.unshift(newUser)

        axios
            .post('http://127.0.0.1:8080/api/profile/create', newUser)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const updateSelectedProfile = (selectedProfile) => {
        axios
            .put(`http://127.0.0.1:8080/api/profile/update`, selectedProfile)
            .then((res) => {
                console.log(res.data)
            })
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
    }
    const values = {
        selectedUser,
        userProfiles,
        currentUser,
    }
    return { ...actions, ...values }
})
