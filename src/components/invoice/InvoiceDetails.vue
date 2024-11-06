<script setup>
import { watchEffect } from 'vue'
// Components
import Card from '@/components/UI/Card.vue'
import InvoiceForm from './InvoiceForm.vue'
import TextBlock from '../UI/TextBlock.vue'
import DateInput from '../inputs/DateInput.vue'
import Button from '../UI/Button.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '@/stores/invoiceStore'
// Routing
import { useRoute } from 'vue-router'
// const props = defineProps({})
// const emit = defineEmits()

const { getInvoiceById, sendInvoice } = useInvoiceStore()
const { selectedInvoice } = storeToRefs(useInvoiceStore())
const route = useRoute()

watchEffect(async () => {
    if (!selectedInvoice.value) {
        await getInvoiceById(route.params.id)
    }
})

const handleSendInvoice = async (id) => {
    await sendInvoice(id)
}
</script>

<template>
    <Card
        v-if="selectedInvoice"
        container-class="mx-auto my-2 border-none shadow box-shadow"
    >
        <h1>{{ selectedInvoice.invoiceNumber }}</h1>
        <p>{{ selectedInvoice.invoiceDate.slice(0, -1) }}</p>
        <InvoiceForm title="Edit Invoice" :invoice-data="selectedInvoice" />
        <Button
            text="Send Invoice"
            @click="handleSendInvoice(selectedInvoice.id)"
        />
    </Card>
</template>
