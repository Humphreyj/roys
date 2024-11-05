<script setup>
// Components
import Card from '@/components/UI/Card.vue'
import Modal from '@/components/UI/Modal.vue'
import PreviewInvoice from './PreviewInvoice.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modalStore'
import { useInvoiceStore } from '@/stores/invoiceStore'
// const props = defineProps({})
// const emit = defineEmits()
const { invoicePreviewModal } = storeToRefs(useModalStore())
const { invoiceData } = storeToRefs(useInvoiceStore())
</script>

<template>
    <Modal
        container-class="left-0 right-0 w-full bg-transparent border-none top-4"
        backdrop-class="absolute top-0 left-0 w-screen h-screen bg-black opacity-50"
        :show-modal="invoicePreviewModal.showing"
        :toggle-modal="invoicePreviewModal.hide"
    >
        <section class="w-full mx-auto md:w-11/12">
            <PreviewInvoice />
        </section>
    </Modal>
</template>
