import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import { useAccountStore } from './accountStore'
// Utils

export const useProfileStore = defineStore('profiles', () => {
    const selectedUser = ref(null)
    const userProfiles = ref([])
    const currentUser = ref('c847868d-dffb-4d1e-a385-74dd578c46a7')
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const handleUserSelect = (user) => {
        selectedUser.value = user
    }

    const getProfileList = async () => {
        const { currentAccount } = storeToRefs(useAccountStore())
        console.log(currentAccount.value)
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
        axios
            .get(`${apiRoot.value}/profile/${id}`)
            .then((res) => {
                selectedUser.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createNewProfile = async (newUser) => {
        const { currentAccount } = storeToRefs(useAccountStore())
        newUser.accountId = currentAccount.value.id
        axios
            .post(`${apiRoot.value}/profile/create`, newUser)
            .then((res) => {
                userProfiles.value.unshift(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const updateSelectedProfile = async (selectedProfile) => {
        axios
            .put(`${apiRoot.value}/profile/update`, selectedProfile)
            .then((res) => {})
            .catch((err) => {
                console.log(err)
            })
    }

    const deleteSelectedProfile = async (id) => {
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
