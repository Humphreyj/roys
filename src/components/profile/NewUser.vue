<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
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
const { createPrimaryContact, getAccessRequest } = useAccountStore()
const { newAccountEmail } = storeToRefs(useAccountStore())
const route = useRoute()

const createNewAccount = async (contact) => {
    // Create the profile for this user
    await createPrimaryContact(contact)
    // On success, create a new account, set the new profile as the primary contact

    // Show Next form
}

onMounted(async () => {
    await getAccessRequest(route.params.requestId)
})

watchEffect(() => {
    if (newAccountEmail.value !== '') {
        newUser.value.email = newAccountEmail.value
    }
    console.log('newUser', newUser.value)
})
</script>

<template>
    <div class="w-full pt-6">
        <ProfileForm
            v-if="newAccountEmail"
            form-title="Contact Information"
            :data="newUser"
            @handle-submit="createNewAccount"
        />
        <div v-else>loading</div>
    </div>
</template>
