<script setup>
import { ref } from 'vue'
// Components
import Modal from '../Modal.vue'
import NewProfileForm from '@/components/forms/NewProfileForm.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modalStore'
import { useProfileStore } from '@/stores/profileStore'
import { useAccountStore } from '@/stores/accountStore'
// const props = defineProps({})
// const emit = defineEmits()

const { profileFormModal } = storeToRefs(useModalStore())
const { createNewProfile } = useProfileStore()
const { currentAccount } = storeToRefs(useAccountStore())
const newUser = ref({
    accountId: currentAccount.value.id,
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
    role: 'client',
})

const handleCreateProfile = async () => {
    await createNewProfile(newUser.value)
    profileFormModal.value.hide()
    newUser.value = {
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
        role: 'client',
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
        <NewProfileForm
            form-title="Add User"
            :data="newUser"
            @handle-submit="handleCreateProfile"
        />
    </Modal>
</template>
