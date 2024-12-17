import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import { useAccountStore } from './accountStore'
// Utils
import { useNotify } from '@/utils/notificationUtils'

export const useProfileStore = defineStore('profiles', () => {
    const selectedUser = ref(null)
    const userProfiles = ref([])
    const currentUser = ref(null)
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const handleUserSelect = (user) => {
        selectedUser.value = user
    }

    const getProfileList = async () => {
        const { currentAccount } = storeToRefs(useAccountStore())
        const accountId = currentAccount.value.id
        axios
            .get(`${apiRoot.value}/profile/list/${accountId}`)
            .then((res) => {
                userProfiles.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getSimpleProfileList = async () => {
        const { currentAccount } = storeToRefs(useAccountStore())
        console.log(currentAccount.value)
        const accountId = currentAccount.value.id
        axios
            .get(`${apiRoot.value}/profile/list/${accountId}/simple`)
            .then((res) => {
                userProfiles.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getProfileById = async (id) => {
        let result
        axios
            .get(`${apiRoot.value}/profile/${id}`)
            .then((res) => {
                selectedUser.value = res.data
                result = res.data
            })
            .catch((err) => {
                console.log(err)
            })
        return result
    }

    const createNewProfile = async (newUser) => {
        const { currentAccount } = storeToRefs(useAccountStore())
        newUser.accountId = currentAccount.value.id
        axios
            .post(`${apiRoot.value}/profile/create-client`, newUser)
            .then((res) => {
                userProfiles.value.unshift(res.data)
                useNotify(
                    'success',
                    'Profile Created',
                    'The profile was created successfully',
                    3000
                )
            })
            .catch((err) => {
                useNotify('error', 'Error', err.response.data, 3000)
            })
    }

    const updateSelectedProfile = async (selectedProfile) => {
        axios
            .put(`${apiRoot.value}/profile/update`, selectedProfile)
            .then(() => {
                useNotify(
                    'success',
                    'Success!',
                    'The profile was updated successfully',
                    3000
                )
            })
            .catch((err) => {
                useNotify('error', 'Error', err.response.data, 3000)
            })
    }

    const deleteSelectedProfile = async (id) => {
        axios
            .delete(`${apiRoot.value}/profile/delete/${id}`)
            .then((res) => {
                userProfiles.value = userProfiles.value.filter(
                    (profile) => profile.id !== id
                )
                useNotify('success', 'Success!', 'Profile deleted.', 3000)
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
        getSimpleProfileList,
        deleteSelectedProfile,
    }
    const values = {
        selectedUser,
        userProfiles,
        currentUser,
    }
    return { ...actions, ...values }
})
