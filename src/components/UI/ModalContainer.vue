<script setup>
// Components
import MemberSettingsModal from '@/components/UI/Modals/MemberSettingsModal.vue'
import ProfileFormModal from './Modals/ProfileFormModal.vue'
import AvatarModal from './Modals/AvatarModal.vue'
import NotificationModal from './Modals/NotificationModal.vue'
import InvoicePreviewModal from '@/components/invoice/InvoicePreviewModal.vue'
import InvoiceFormModal from '@/components/invoice/InvoiceFormModal.vue'
// Pinia

// const props = defineProps({})

// const emit = defineEmits()
</script>

<template>
    <div class="absolute hidden">
        <Teleport to="#modals">
            <MemberSettingsModal />
            <ProfileFormModal />
            <AvatarModal />
            <NotificationModal />
            <InvoicePreviewModal />
            <InvoiceFormModal />
        </Teleport>
    </div>
</template>
