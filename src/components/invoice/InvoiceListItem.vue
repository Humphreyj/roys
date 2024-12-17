<script setup>
// Assets
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/solid'
// Components
import { RouterLink } from 'vue-router'
// Utils
import { handleFormat } from '@/utils/formatText'
const props = defineProps({
    invoice: {
        type: Object,
    },
})
const emit = defineEmits(['setSelectedInvoice'])
</script>

<template>
    <section
        class="justify-between hidden w-full grid-cols-6 gap-4 p-2 shadow md:grid dark:shadow-slate-600 dark:shadow-sm"
    >
        <div class="gap-2 cursor-pointer flex-ic-js">
            <p class="font-bold">
                {{ invoice.invoiceNumber }}
            </p>
        </div>
        <p class="font-bold">
            {{ invoice.client.full_name }}
        </p>
        <p class="font-bold">
            {{ handleFormat(invoice.dueDate, 'date') }}
        </p>
        <p class="font-bold">
            {{ handleFormat(invoice.invoiceTotal, 'currency') }}
        </p>
        <p class="font-bold">
            {{ invoice.status }}
        </p>
        <RouterLink
            class="justify-self-end"
            :to="{
                name: 'Invoice Details',
                params: { id: invoice.id },
            }"
            @click="emit('setSelectedInvoice', invoice)"
        >
            <ChevronDoubleRightIcon class="cursor-pointer size-7" />
        </RouterLink>
    </section>
    <section
        class="grid justify-between w-full grid-cols-2 gap-4 p-2 shadow dark:shadow-slate-600 dark:shadow-sm"
    >
        <div class="gap-2 cursor-pointer flex-col-is-js">
            <p class="font-semibold">Invoice</p>
            <p class="font-bold">
                {{ invoice.invoiceNumber }}
            </p>
        </div>
        <div class="gap-2 flex-col-is-js">
            <p class="font-semibold">Client</p>
            <p class="font-bold">
                {{ invoice.client.full_name }}
            </p>
        </div>
        <div class="gap-2 flex-col-is-js">
            <p class="font-semibold">Due Date</p>
            <p class="font-bold">
                {{ handleFormat(invoice.dueDate, 'date') }}
            </p>
        </div>
        <div class="gap-2 flex-col-is-js">
            <p class="font-semibold">Total</p>
            <p class="font-bold">
                {{ handleFormat(invoice.invoiceTotal, 'currency') }}
            </p>
        </div>
        <div class="gap-2 flex-col-is-js">
            <p class="font-semibold">Status</p>
            <p class="font-bold">
                {{ invoice.status }}
            </p>
        </div>

        <RouterLink
            class="absolute justify-self-end"
            :to="{
                name: 'Invoice Details',
                params: { id: invoice.id },
            }"
            @click="emit('setSelectedInvoice', invoice)"
        >
            <ChevronDoubleRightIcon class="cursor-pointer size-7" />
        </RouterLink>
    </section>
</template>
