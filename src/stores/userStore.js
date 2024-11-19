import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'

export const useUserStore = defineStore('userStore', () => {
    const currentUser = ref({})
    // const currentUser = ref({
    //     id: 'f541357d-9d69-11ef-8bf2-0242ac140003',
    //     first_name: 'Test',
    //     last_name: 'Testman',
    //     address: {
    //         address_line_1: '123 Test Drive',
    //         address_line_2: '',
    //         city: 'Testville',
    //         state: 'tx',
    //         zip: '44343',
    //     },
    //     email: 'testman@bestman.com',
    //     phone: '232-232-3333',
    //     role: 'admin',
    //     created_at: '2024-08-30T18:14:55.119Z',
    // })

    const getCurrentUser = async (id) => {
        const { apiRoot } = storeToRefs(useRuntimeStore())
        axios
            .get(`${apiRoot.value}/profile/${id}`)
            .then((res) => {
                currentUser.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const actions = {
        getCurrentUser,
    }
    const values = {
        currentUser,
    }
    return { ...actions, ...values }
})
