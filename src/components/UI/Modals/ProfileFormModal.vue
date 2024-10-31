<script setup>
import { ref } from 'vue'
// Components
import Modal from '../Modal.vue'
import BasicForm from '@/components/forms/BasicForm.vue'
// const props = defineProps({})
// const emit = defineEmits()
const newUser = ref({
    address_line_1: '123 Test Dr',
    city: 'Testville',
    state: 'tx',
    zip: '55343',
    email: 'jimothy@mail.com',
    phone: '832-283-5446',
    created_at: '2024-10-30T17:05:27.138Z',
    first_name: 'Jimothy',
    last_name: 'James',
    address_line_2: 'Default Text',
})
// Pinia
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modalStore'
import { useProfileStore } from '@/stores/profileStore'

const { profileFormModal } = storeToRefs(useModalStore())
const { createNewProfile } = useProfileStore()

const handleCreateProfile = (newProfileData) => {
    createNewProfile(newProfileData)
    profileFormModal.value.hide()
    newUser.value = {
        first_name: '',
        last_name: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        phone: '',
    }
}
// Utils
</script>

<template>
    <Modal
        container-class="absolute h-[44rem] md:left-1/3 top-10 w-full md:w-1/2 border-none bg-transparent"
        backdrop-class="w-screen bg-black opacity-50"
        :show-modal="profileFormModal.showing"
        :toggle-modal="profileFormModal.toggle"
    >
        <BasicForm
            form-title="Add User"
            :data="newUser"
            @handle-submit="handleCreateProfile"
        />
    </Modal>
</template>
