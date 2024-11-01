<script setup>
import { ref, computed, onBeforeMount, watchEffect } from 'vue'
// Components
import BasicSelect from '../inputs/BasicSelect.vue'
import Button from '@/components/UI/Button.vue'
import Card from '@/components/UI/Card.vue'
import InvoiceLineItem from './InvoiceLineItem.vue'
import TextInput from '@/components/inputs/TextInput.vue'

// Pinia
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profileStore'
import { useInvoiceStore } from '@/stores/invoiceStore'
// Utils
import { v4 as uuidv4 } from 'uuid'
import { handleFormat } from '@/utils/formatText'
import router from '@/router'

let date = new Date()

const { getProfileList } = useProfileStore()
const { userProfiles } = storeToRefs(useProfileStore())
const { invoiceData } = storeToRefs(useInvoiceStore())
const { createNewInvoice } = useInvoiceStore()

const showInvoice = ref(false)

const lineItems = ref([
    {
        id: uuidv4(),
        description: '',
        quantity: 1,
        unitPrice: 0,
        lineItemTotal: 0,
    },
])

const addLineItem = () => {
    lineItems.value.push({
        id: uuidv4(),
        description: '',
        quantity: 1,
        unitPrice: 0,
        lineItemTotal: 0,
    })
}

const newInvoiceData = ref({
    client: null,
    invoiceNumber: '001',
    invoiceDate: date,
    invoiceDueDate: null,
    status: 'unpaid',
    lineItems: [],
    invoiceTotal: 0,
})

const invoiceTotal = computed(() => {
    let result = 0
    lineItems.value.forEach((item) => {
        result += item.lineItemTotal
    })
    return result
})

const submitInvoice = async (e) => {
    e.preventDefault()
    newInvoiceData.value.lineItems = lineItems.value
    newInvoiceData.value.invoiceTotal = invoiceTotal.value
    showInvoice.value = true
    console.log(newInvoiceData.value)
    invoiceData.value = newInvoiceData.value
    await createNewInvoice(invoiceData.value)
    // router.push('/invoice')
}

onBeforeMount(async () => {
    await getProfileList()
})
</script>

<template>
    <Card container-class="w-11/12 gap-1 p-4 mx-auto md:w-3/4 min-w-60">
        <section class="w-full gap-1 p-4 mx-auto flex-col-ic-js">
            <h4 class="my-2 title-text">New Invoice</h4>
            <BasicSelect
                v-model="newInvoiceData.client"
                label="Client"
                :options="userProfiles"
                target-attr="full_name"
                target-type="object"
            />
            <TextInput
                v-model="newInvoiceData.invoiceNumber"
                data-test="new-invoice-number"
                label="Invoice Number"
                input-class="min-w-60"
            />
            <TextInput
                v-model="newInvoiceData.invoiceDate"
                data-test="new-invoice-date"
                label="Invoice Date"
                input-class="min-w-60"
                type="date"
            />
            <TextInput
                v-model="newInvoiceData.invoiceDueDate"
                data-test="new-invoice-due-date"
                label="Invoice Due Date"
                input-class="min-w-60"
                type="date"
            />
        </section>
        <section class="w-full gap-1 p-4 flex-col-is-js">
            <h3>Line Items</h3>
            <InvoiceLineItem
                v-for="item in lineItems"
                :key="item.id"
                :line-item="item"
            />

            <Button
                text="Add Item"
                button-class="align-self-start"
                @click="addLineItem"
            />
        </section>
        <p>{{ handleFormat(invoiceTotal, 'currency') }}</p>

        <Button text="submit" @click="($event) => submitInvoice($event)" />
    </Card>
</template>
