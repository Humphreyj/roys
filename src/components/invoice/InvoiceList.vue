<script setup>
// Components
import Avatar from '@/components/UI/Avatar.vue'
import Card from '@/components/UI/Card.vue'
import InvoiceListItem from './InvoiceListItem.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '@/stores/invoiceStore'
import { useModalStore } from '@/stores/modalStore'

// Routing
import { RouterLink } from 'vue-router'
// Utils
import { handleFormat } from '@/utils/formatText'

// const props = defineProps({})
// const emit = defineEmits()

const { invoiceList } = storeToRefs(useInvoiceStore())
const { setSelectedInvoice } = useInvoiceStore()

const { invoicePreviewModal, invoiceFormModal } = storeToRefs(useModalStore())

const handleInvoicePreview = (invoice) => {
    setSelectedInvoice(invoice)
    invoicePreviewModal.value.show()
}
</script>

<template>
    <Card container-class="mx-auto my-2 border-none shadow box-shadow">
        <section class="primary-text">
            <header class="px-3 border-b flex-ic-jb h-14">
                <h4 class="text-xl font-semibold font-display">
                    Manage Invoices
                </h4>
                <!-- <RouterLink to="/profiles/new" class="border-none"> -->
                <RouterLink
                    data-test="create-invoice"
                    class="border-gray-700 cursor-pointer hover:border-b"
                    :to="{ name: 'Create New Invoice' }"
                >
                    Create Invoice
                </RouterLink>
                <!-- </RouterLink> -->
            </header>
            <div class="w-full gap-2 py-3 flex-col-ic-js">
                <section
                    class="justify-between hidden w-full grid-cols-6 gap-4 p-2 font-semibold shadow md:grid dark:shadow-slate-600 dark:shadow-sm"
                >
                    <p>Invoice</p>
                    <p>Client</p>
                    <p>Due Date</p>
                    <p>Total</p>
                    <p>Status</p>
                </section>
                <InvoiceListItem
                    v-for="invoice in invoiceList"
                    :key="invoice.id"
                    :invoice="invoice"
                    @set-selected-invoice="setSelectedInvoice"
                />
            </div>
        </section>
    </Card>
</template>
