<script setup>
// Components

import Modal from '@/components/UI/Modal.vue'
import InvoiceForm from './InvoiceForm.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modalStore'
// const props = defineProps({})
// const emit = defineEmits()
const { invoiceFormModal } = storeToRefs(useModalStore())
</script>

<template>
    <Modal
        container-class="left-0 right-0 w-full bg-transparent border-none top-4"
        backdrop-class="absolute top-0 left-0 w-screen h-screen bg-black opacity-50"
        :show-modal="invoiceFormModal.showing"
        :toggle-modal="invoiceFormModal.hide"
    >
        <section class="w-11/12 mx-auto">
            <InvoiceForm />
        </section>
    </Modal>
</template>
