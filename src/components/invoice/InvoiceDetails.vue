<script setup>
import { watchEffect } from 'vue'
// Components
import Card from '@/components/UI/Card.vue'
import InvoiceForm from './InvoiceForm.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '@/stores/invoiceStore'
// Routing
import { useRoute } from 'vue-router'
// const props = defineProps({})
// const emit = defineEmits()

const { getInvoiceById } = useInvoiceStore()
const { selectedInvoice } = storeToRefs(useInvoiceStore())
const route = useRoute()

watchEffect(async () => {
    if (!selectedInvoice.value) {
        await getInvoiceById(route.params.id)
    }
})
</script>

<template>
    <Card
        v-if="selectedInvoice"
        container-class="mx-auto my-2 border-none shadow box-shadow"
    >
        <h1>{{ selectedInvoice.invoiceNumber }}</h1>
    </Card>
</template>
