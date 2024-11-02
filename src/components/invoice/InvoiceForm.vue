<script setup>
import { ref, computed, onBeforeMount } from 'vue'
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
import { useModalStore } from '@/stores/modalStore'
// Utils
import { v4 as uuidv4 } from 'uuid'
import { handleFormat } from '@/utils/formatText'

const { getProfileList } = useProfileStore()
const { userProfiles } = storeToRefs(useProfileStore())
const { invoiceData } = storeToRefs(useInvoiceStore())
const { createNewInvoice, setSelectedInvoice } = useInvoiceStore()

const { invoicePreviewModal } = storeToRefs(useModalStore())

const showInvoice = ref(false)

const lineItems = ref([
    {
        id: uuidv4(),
        description: '',
        quantity: 1,
        unitType: '',
        unitPrice: 0,
        lineItemTotal: 0,
    },
])

const addLineItem = () => {
    lineItems.value.push({
        id: uuidv4(),
        description: '',
        quantity: 1,
        unitType: '',
        unitPrice: 0,
        lineItemTotal: 0,
    })
}

const deleteLineItem = (id) => {
    let itemIndex = lineItems.value.findIndex((lineItem) => lineItem.id === id)
    lineItems.value.splice(itemIndex, 1)
}

const newInvoiceData = ref({
    client: null,
    invoiceNumber: '001',
    invoiceDate: null,
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
    await createNewInvoice(newInvoiceData.value)
}
const previewInvoice = async (e) => {
    e.preventDefault()
    newInvoiceData.value.lineItems = lineItems.value
    newInvoiceData.value.invoiceTotal = invoiceTotal.value
    showInvoice.value = true
    setSelectedInvoice(newInvoiceData.value)
    invoicePreviewModal.value.show()
}

onBeforeMount(async () => {
    await getProfileList()
})
</script>

<template>
    <Card
        container-class="w-full gap-1 px-4 mx-auto md:w-10/12 lg:w-3/4 min-w-60"
    >
        <h4 class="mb-2 title-text">New Invoice</h4>
        <section class="w-full gap-1 px-4 mx-auto flex-col-ic-js">
            <div
                class="w-full gap-4 lg:gap-8 flex-col-is-js md:flex-ic-jb md:flex-row"
            >
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
                />
            </div>
            <div
                class="w-full gap-4 lg:gap-8 flex-col-is-js md:flex-ic-jb md:flex-row"
            >
                <TextInput
                    v-model="newInvoiceData.invoiceDate"
                    data-test="new-invoice-date"
                    label="Invoice Date"
                    type="date"
                />
                <TextInput
                    v-model.date="newInvoiceData.invoiceDueDate"
                    data-test="new-invoice-due-date"
                    label="Invoice Due Date"
                    type="date"
                />
            </div>
        </section>
        <section class="w-full gap-1 p-4 flex-col-is-js">
            <h3>Line Items</h3>
            <InvoiceLineItem
                v-for="item in lineItems"
                :key="item.id"
                :line-item="item"
                @delete-line-item="deleteLineItem"
            />

            <Button
                text="Add Item"
                button-class="align-self-start"
                @click="addLineItem"
            />
        </section>
        <p>{{ handleFormat(invoiceTotal, 'currency') }}</p>
        <div class="w-full flex-ic-jb">
            <Button text="Submit" @click="($event) => submitInvoice($event)" />
            <Button
                text="Preview"
                @click="($event) => previewInvoice($event)"
            />
        </div>
    </Card>
</template>
