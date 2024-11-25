<script setup>
import { ref, watchEffect } from 'vue'
// Components
import Button from '@/components/UI/Button.vue'
import Card from '@/components/UI/Card.vue'
import Modal from '@/components/UI/Modal.vue'
import NewProfileForm from '@/components/forms/NewProfileForm.vue'
import ProfileDetailsCard from '@/components/profile/ProfileDetailsCard.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useProfileStore } from '../../stores/profileStore'
// Routing
import router from '@/router'
import { useRoute } from 'vue-router'
// Utils
import { useToggle } from '@vueuse/core'
const route = useRoute()

const { selectedUser } = storeToRefs(useProfileStore())
const { getProfileById, updateSelectedProfile, deleteSelectedProfile } =
    useProfileStore()

watchEffect(() => {
    if (!selectedUser.value) {
        getProfileById(route.params.id)
    }
})
const isEditingProfile = ref(false)
const toggleEditingProfile = useToggle(isEditingProfile)

const submitEditing = async (selectedUser) => {
    await updateSelectedProfile(selectedUser)
    isEditingProfile.value = false
}

const showDelete = ref(false)

const handleDelete = async (id) => {
    showDelete.value = true
}
const confirmDelete = async (id) => {
    await deleteSelectedProfile(id)
    router.push({ name: 'Manage Profiles' })
}
</script>

<template>
    <div v-if="selectedUser" class="w-11/12 pt-12 mx-auto">
        <Teleport to="#modals">
            <Modal
                container-class="w-1/4 transform -translate-x-1/2 bg-transparent border-none left-1/2 top-24"
                backdrop-class="absolute top-0 left-0 w-screen h-screen bg-black opacity-50"
                :show-modal="showDelete"
            >
                <Card>
                    <section class="flex-col-ic-je">
                        <h4 class="text-lg font-bold">
                            Do you want to delete this profile?
                        </h4>
                        <div
                            class="w-10/12 mx-auto mt-12 align-bottom flex-ic-jb"
                        >
                            <Button
                                text="Yes"
                                button-class="bg-red-500"
                                @click="confirmDelete(selectedUser.id)"
                            />
                            <Button
                                text="No"
                                @click="() => (showDelete = false)"
                            />
                        </div>
                    </section>
                </Card>
            </Modal>
        </Teleport>
        <Button text="Delete" @click="handleDelete(selectedUser.id)" />
        <div v-if="isEditingProfile" class="w-full mx-auto md:w-2/3">
            <NewProfileForm
                form-title="Edit Profile"
                :data="selectedUser"
                @handle-submit="submitEditing(selectedUser)"
            />
        </div>
        <ProfileDetailsCard
            v-else
            :user="selectedUser"
            @toggle-editing="toggleEditingProfile"
        />
    </div>
</template>
