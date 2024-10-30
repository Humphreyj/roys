<script setup>
// Components
import { computed } from 'vue'
// const props = defineProps({})
// const emit = defineEmits()
import { handleFormat } from '@/utils/formatText'

let date = new Date()
let dateOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
}
let invoiceDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date)
let invoiceNumber = '42069'

const invoiceData = {
    companyName: "Roy's Repairs",
    companyAddress: '123 Main St, Tickletown, USA',
    date: invoiceDate,
    invoiceNumber: invoiceNumber,
    client: {
        name: 'Rick Toucher',
        email: 'rick@toucher.com',
        address: {
            address_line_1: '30118 Craig Pass',
            city: 'Davisside',
            state: 'GA',
            zip: '61714',
        },
    },
    items: [
        {
            id: 0,
            description: 'Plumbing Repair',
            quantity: 2,
            unit: 'hours',
            unitPrice: 75.0,
        },
        {
            id: 1,
            description: 'Electrical Service',
            quantity: 2,
            unit: 'hours',
            unitPrice: 120.0,
        },
        {
            id: 2,
            description: 'Painting Service',
            quantity: 2,
            unit: 'hours',
            unitPrice: 50.0,
        },
    ],
}

const invoiceTotal = computed(() => {
    let result = 0
    invoiceData.items.forEach((item) => {
        result += item.quantity * item.unitPrice
    })
    return result
})
</script>

<template>
    <main class="w-full px-20 py-6 flex-col-is-js">
        <section class="w-full flex-col-is-js">
            <div class="w-full gap-3 flex-col-ic-jc">
                <h3 class="text-3xl font-bold text-center">
                    {{ invoiceData.companyName }}
                </h3>
                <h3 class="text-2xl font-bold text-center">
                    Invoice #{{ invoiceNumber }}
                </h3>
                <p class="text-xl font-semibold">{{ invoiceDate }}</p>
            </div>
            <div class="gap-1 mt-8 flex-col-is-js">
                <p class="text-2xl font-bold">Bill to:</p>
                <p class="text-xl">{{ invoiceData.client.name }}</p>
                <p>
                    {{ handleFormat(invoiceData.client.address, 'address') }}
                </p>
                <p>{{ invoiceData.client.email }}</p>
            </div>
        </section>
        <section class="w-full mx-auto mt-6 flex-col-ic-js">
            <header class="grid w-full grid-cols-4 gap-2 font-semibold">
                <p>Description</p>
                <p class="place-self-center">Quantity</p>

                <p class="place-self-center">Unit Price</p>
                <p class="place-self-end">Total</p>
            </header>
            <div
                v-for="item in invoiceData.items"
                :key="item.id"
                class="grid w-full grid-cols-4 gap-2 my-2"
            >
                <p>{{ item.description }}</p>
                <p class="place-self-center">
                    {{ `${item.quantity} ${item.unit}` }}
                </p>

                <p class="place-self-center">
                    {{ handleFormat(item.unitPrice, 'currency') }}
                </p>
                <p class="place-self-end">
                    {{
                        handleFormat(item.quantity * item.unitPrice, 'currency')
                    }}
                </p>
            </div>
        </section>
        <div class="w-full mt-4 flex-ic-jend">
            <p class="text-xl font-bold text-right">
                Total: {{ handleFormat(invoiceTotal, 'currency') }}
            </p>
        </div>
    </main>
</template>
