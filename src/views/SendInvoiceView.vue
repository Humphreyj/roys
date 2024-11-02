<script setup>
import { watchEffect } from 'vue'
// Components
// Pinia
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '@/stores/invoiceStore'
import { useRuntimeStore } from '@/stores/runtimeStore'
// Utils
import { handleFormat } from '@/utils/formatText'
// Routing
import { useRoute } from 'vue-router'

const { selectedInvoice } = storeToRefs(useInvoiceStore())
const { getInvoiceById } = useInvoiceStore()
const { configOptions } = storeToRefs(useRuntimeStore())

const route = useRoute()

watchEffect(async () => {
    if (!selectedInvoice.value) {
        await getInvoiceById(route.params.id)
    }
})
</script>

<template>
    <main class="w-full px-4 py-6 bg-white md:px-20 flex-col-is-js">
        <div v-if="!selectedInvoice">Loading</div>
        <div v-else class="w-full">
            <section class="w-full flex-col-is-js">
                <div class="w-full gap-3 flex-ic-jb">
                    <h3 class="text-3xl font-semibold text-center">
                        {{ configOptions.clientName }}
                    </h3>
                    <h3 class="text-2xl text-center">
                        Invoice
                        <span class="font-bold"
                            >#{{ selectedInvoice.invoiceNumber }}</span
                        >
                    </h3>
                </div>
                <section class="w-full flex-ic-jb">
                    <div class="gap-1 mt-8 -2 flex-col-is-js">
                        <p class="text-lg font-bold">Bill to:</p>
                        <p class="">
                            {{ selectedInvoice.client.full_name }}
                        </p>
                        <p class="w-3/4">
                            {{
                                handleFormat(selectedInvoice.client, 'address')
                            }}
                        </p>
                        <p>{{ selectedInvoice.client.email }}</p>
                    </div>
                    <div class="gap-1 mt-8 flex-col-ie-js">
                        <div class="gap-2 flex-ic-js">
                            <p>Date:</p>
                            <p>
                                {{
                                    handleFormat(
                                        selectedInvoice.invoiceDate,
                                        'date'
                                    )
                                }}
                            </p>
                        </div>
                        <div class="gap-2 flex-ic-js">
                            <p>Due Date:</p>
                            <p>
                                {{
                                    handleFormat(
                                        selectedInvoice.dueDate,
                                        'date'
                                    )
                                }}
                            </p>
                        </div>
                    </div>
                </section>
            </section>
            <section class="w-full mx-auto mt-6 flex-col-ic-js">
                <header
                    class="grid w-full grid-cols-5 gap-2 font-semibold text-white border-b md:px-4 bg-slate-600"
                >
                    <p>Description</p>
                    <p class="place-self-center">Quantity</p>

                    <p class="place-self-center">Unit</p>
                    <p class="place-self-center">Unit Price</p>
                    <p class="place-self-end">Total</p>
                </header>
                <div
                    v-for="item in selectedInvoice.lineItems"
                    :key="item.id"
                    class="grid w-full grid-cols-4 gap-2 my-2 md:px-4"
                >
                    <p class="">{{ item.description }}</p>
                    <p class="place-self-center">
                        {{ `${item.quantity}` }}
                    </p>
                    <p class="place-self-center">
                        {{ `${item.unit}` }}
                    </p>

                    <p class="place-self-center">
                        {{ handleFormat(item.unitPrice, 'currency') }}
                    </p>
                    <p class="place-self-end">
                        {{
                            handleFormat(
                                item.quantity * item.unitPrice,
                                'currency'
                            )
                        }}
                    </p>
                </div>
            </section>
            <div class="w-full mt-4 flex-ic-jend">
                <p class="text-xl font-bold text-right">
                    Total:
                    {{ handleFormat(selectedInvoice.invoiceTotal, 'currency') }}
                </p>
            </div>
        </div>
    </main>
</template>
