<script setup>
import { getStyles } from '@/composables/getStyles'
import router from '@/router'
// Components
import Modal from '@/components/UI/Modal.vue'
import TextBlock from '@/components/UI/TextBlock.vue'

// Pinia
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modalStore'
import { useUserStore } from '@/stores/userStore'
import { useAccountStore } from '@/stores/accountStore'
import { useAuthStore } from '@/stores/authStore'

// Modal Store

const { avatarModalContent, avatarModal } = storeToRefs(useModalStore())
const { currentUser } = storeToRefs(useUserStore())
const { currentAccount } = storeToRefs(useAccountStore())
const { logout } = useAuthStore()

// Props
const props = defineProps({
    containerClass: {
        type: String,
        default: '',
    },
})
// Utils
const classes = getStyles(props, 'notificationModal')

const handleNav = async (content) => {
    console.log(content)
    if (content === 'Account') {
        router.push(`/account/${currentUser.value.accountId}`)
    } else if (content === 'Logout') {
        await logout()
        router.push({ name: 'Log In' })
    }
}
</script>

<template>
    <div class="relative">
        <Modal
            container-class="right-12 top-12"
            backdrop-class="w-screen"
            :show-modal="avatarModal.showing"
            :toggle-modal="avatarModal.toggle"
        >
            <TextBlock
                v-for="item in avatarModalContent"
                :text-content="item.content"
                :container-class="classes.containerClass"
                @click="handleNav(item.content)"
            />
        </Modal>
    </div>
</template>
