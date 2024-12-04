<script setup>
import { ref, watchEffect } from 'vue'
// Components
import InvoiceForm from './InvoiceForm.vue'
import PreviewInvoice from './PreviewInvoice.vue'
import Button from '../UI/Button.vue'
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/outline'
// Pinia
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '@/stores/invoiceStore'
// Routing
import { useRoute } from 'vue-router'
import router from '@/router'
// Utils
import { handleFormat } from '@/utils/formatText'

// const props = defineProps({})
// const emit = defineEmits()

const { getInvoiceById, sendInvoice } = useInvoiceStore()
const { selectedInvoice, invoiceBeingEdited } = storeToRefs(useInvoiceStore())

const route = useRoute()
const goBack = () => {
    router.push({ name: 'Invoice List' })
}

watchEffect(async () => {
    if (!selectedInvoice.value.id) {
        await getInvoiceById(route.params.id)
    }
})

const handleSendInvoice = async (id) => {
    await sendInvoice(id)
}
</script>

<template>
    <div v-if="selectedInvoice" class="w-full">
        <ArrowLeftCircleIcon
            class="cursor-pointer left-5 size-8 primary-text"
            @click="goBack"
        />
        <section class="w-full my-4 flex-ic-jb">
            <div v-if="selectedInvoice.status === 'draft'">
                <Button
                    v-if="invoiceBeingEdited"
                    text="Cancel"
                    @click="() => (invoiceBeingEdited = false)"
                />
                <Button
                    v-else
                    text="Edit Invoice"
                    @click="() => (invoiceBeingEdited = true)"
                />
            </div>
        </section>
        <InvoiceForm
            v-if="selectedInvoice.status === 'draft' && invoiceBeingEdited"
            title="Edit Invoice"
            :invoice-data="selectedInvoice"
            :new-invoice="false"
        />
        <PreviewInvoice v-else />
        <div class="w-full gap-3 flex-ic-jend">
            <p v-if="selectedInvoice.lastSentDate">
                Last sent:
                {{ handleFormat(selectedInvoice.lastSentDate, 'date') }}
            </p>
            <Button
                text="Send Invoice"
                @click="handleSendInvoice(selectedInvoice)"
            />
        </div>
    </div>
</template>
