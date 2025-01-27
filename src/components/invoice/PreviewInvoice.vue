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
    if (!selectedInvoice.value.id) {
        await getInvoiceById(route.params.id)
    }
})
</script>

<template>
    <main class="w-full py-6 bg-white flex-col-is-js">
        <div v-if="!selectedInvoice.id">Loading</div>
        <div v-else class="w-full">
            <section class="w-full px-4 flex-col-is-js">
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
                        <p
                            v-if="selectedInvoice.client.address.line_1"
                            class="w-max"
                        >
                            {{
                                handleFormat(
                                    selectedInvoice.client.address,
                                    'address'
                                )
                            }}
                        </p>
                        <p>{{ selectedInvoice.client.email }}</p>
                    </div>
                    <div class="gap-1 mt-8 flex-col-ie-js">
                        <div class="gap-2 flex-is-js">
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
                    class="grid w-full grid-cols-5 gap-2 px-4 font-semibold text-white border-b md:px-4 bg-slate-600"
                >
                    <p>Item</p>
                    <p class="place-self-center">Quantity</p>

                    <p class="place-self-center">Unit</p>
                    <p class="place-self-center">Price</p>
                    <p class="place-self-end">Total</p>
                </header>
                <div
                    v-for="item in selectedInvoice.lineItems"
                    :key="item.id"
                    class="grid w-full grid-cols-5 gap-2 px-4 my-2 md:px-4"
                >
                    <p class="">{{ item.description }}</p>
                    <p class="place-self-center">
                        {{ `${item.quantity}` }}
                    </p>
                    <p class="place-self-center">
                        {{ `${item.unitType}` }}
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
            <section
                v-if="selectedInvoice.comments"
                class="w-full px-2 my-3 flex-col-is-js"
            >
                <h3 class="text-lg font-semibold">Additional Comments</h3>
                <div class="">
                    <p class="">
                        {{ selectedInvoice.comments }}
                    </p>
                </div>
            </section>

            <div class="w-full px-2 mb-3 flex-ic-jend">
                <div class="flex-col-is-je">
                    <div v-if="selectedInvoice.totalDiscount > 0">
                        <p>Discount</p>
                        <p class="text-xl font-semibold">
                            {{
                                handleFormat(
                                    selectedInvoice.totalDiscount,
                                    'currency'
                                )
                            }}
                        </p>
                    </div>
                    <div class="flex-col-ie-js *:w-40 *:gap-2">
                        <div
                            v-if="selectedInvoice.taxable"
                            class="font-semibold flex-ic-jb"
                        >
                            <p>Subtotal</p>
                            <p>
                                {{
                                    handleFormat(
                                        selectedInvoice.invoiceTotal -
                                            selectedInvoice.totalTax,
                                        'currency'
                                    )
                                }}
                            </p>
                        </div>
                        <div
                            v-if="selectedInvoice.taxable"
                            class="font-semibold flex-ic-jb"
                        >
                            <p>Tax</p>
                            <p>
                                {{
                                    handleFormat(
                                        selectedInvoice.totalTax,
                                        'currency'
                                    )
                                }}
                            </p>
                        </div>
                        <div class="text-lg font-semibold flex-ic-jb">
                            <p>Total</p>
                            <p>
                                {{
                                    handleFormat(
                                        selectedInvoice.invoiceTotal,
                                        'currency'
                                    )
                                }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
