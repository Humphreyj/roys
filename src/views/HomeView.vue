<script setup>
// Components
import MetricCard from '@/components/cards/MetricCard.vue'
import Button from '@/components/UI/Button.vue'
import Card from '@/components/UI/Card.vue'
import InvoiceForm from '@/components/invoice/InvoiceForm.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '@/stores/invoiceStore'
// Utils
import { handleFormat } from '@/utils/formatText'
// const props = defineProps({})
// const emit = defineEmits()
const { nextInvoiceNumber, totalInvoiced } = storeToRefs(useInvoiceStore())
</script>

<template>
    <section
        class="w-full max-w-[75rem] mx-auto primary-text px-2 font-display flex-col-ic-js"
    >
        <section class="grid w-full grid-cols-2 gap-2 mt-8 md:grid-cols-4">
            <MetricCard
                metric-title="Invoices"
                :metric-value="`${nextInvoiceNumber - 1}`"
                metric-type="number"
            >
                <section class="flex-col-is-js">
                    <div></div>
                    <p>Total Invoiced</p>
                    <p>{{ handleFormat(totalInvoiced, 'currency') }}</p>
                </section>
            </MetricCard>
        </section>
    </section>
</template>
