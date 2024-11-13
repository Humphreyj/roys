import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
    const currentUser = ref({
        first_name: 'Test',
        last_name: 'Testman',
        address_line_1: '123 Test Drive',
        address_line_2: '',
        city: 'Testville',
        state: 'tx',
        zip: '44343',
        email: 'testman@bestman.com',
        phone: '232-232-3333',
        role: 'admin',
        created_at: '2024-08-30T18:14:55.119Z',
    })

    const actions = {}
    const values = {
        currentUser,
    }
    return { ...actions, ...values }
})
