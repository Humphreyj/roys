<script setup>
import { ref } from 'vue'
// Components
import ProfileForm from '../forms/ProfileForm.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/accountStore'
// const props = defineProps({})
// const emit = defineEmits()
const newUser = ref({
    first_name: '',
    last_name: '',
    address: {
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        zip: '',
    },
    email: '',
    phone: '',
    role: 'admin',
})
const { createPrimaryContact } = useAccountStore()

const createNewAccount = async (contact) => {
    // Create the profile for this user
    await createPrimaryContact(contact)
    // On success, create a new account, set the new profile as the primary contact

    // Show Next form
}
</script>

<template>
    <div class="w-full pt-6">
        <ProfileForm
            form-title="Contact Information"
            :data="newUser"
            @handle-submit="createNewAccount"
        />
    </div>
</template>
