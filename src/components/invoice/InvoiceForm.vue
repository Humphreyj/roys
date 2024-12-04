<script setup>
import { ref, computed, onBeforeMount, watchEffect, watch } from 'vue'
// Components
import Button from '@/components/UI/Button.vue'
import Card from '@/components/UI/Card.vue'
import DateInput from '../inputs/DateInput.vue'
import InvoiceLineItem from './InvoiceLineItem.vue'
import BasicSelect from '@/components/inputs/BasicSelect.vue'
import TextInput from '@/components/inputs/TextInput.vue'

// Pinia
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profileStore'
import { useInvoiceStore } from '@/stores/invoiceStore'
import { useModalStore } from '@/stores/modalStore'
import { useAccountStore } from '@/stores/accountStore'
// Utils
import { v4 as uuidv4 } from 'uuid'
import { handleFormat } from '@/utils/formatText'

const { getProfileList } = useProfileStore()
const { userProfiles } = storeToRefs(useProfileStore())
const { createNewInvoice, setSelectedInvoice, updateInvoice } =
    useInvoiceStore()
const { invoiceBeingEdited, nextInvoiceNumber } = storeToRefs(useInvoiceStore())
const { invoicePreviewModal } = storeToRefs(useModalStore())
const { currentAccount } = storeToRefs(useAccountStore())

const props = defineProps({
    title: { type: String, default: 'New Invoice' },
    invoiceData: {
        type: Object,
    },
    newInvoice: {
        type: Boolean,
        default: true,
    },
})
const invoiceData = ref(
    props.invoiceData ?? {
        accountId: currentAccount.value.id,
        clientId: '',
        invoiceNumber: nextInvoiceNumber.value,
        invoiceDate: '',
        dueDate: '',
        status: 'draft',
        lineItems: [],
        invoiceTotal: 0,
    }
)
const showInvoice = ref(false)

const lineItems = ref([
    {
        id: uuidv4(),
        description: '',
        quantity: null,
        unitType: '',
        unitPrice: null,
        lineItemTotal: 0,
    },
])

const addLineItem = () => {
    lineItems.value.push({
        id: uuidv4(),
        description: '',
        quantity: null,
        unitType: '',
        unitPrice: null,
        lineItemTotal: 0,
    })
}

const deleteLineItem = (id) => {
    let itemIndex = lineItems.value.findIndex((lineItem) => lineItem.id === id)
    lineItems.value.splice(itemIndex, 1)
}

const invoiceTotal = computed(() => {
    let result = 0
    lineItems.value.forEach((item) => {
        result += item.lineItemTotal
    })
    return result
})

const submitInvoice = async (e) => {
    e.preventDefault()
    invoiceData.value.lineItems = lineItems.value
    invoiceData.value.invoiceTotal = invoiceTotal.value
    showInvoice.value = true
    if (props.newInvoice) {
        await createNewInvoice(invoiceData.value)
    } else {
        await updateInvoice(invoiceData.value)
        invoiceBeingEdited.value = false
    }
}
const previewInvoice = async (e) => {
    e.preventDefault()
    invoiceData.value.lineItems = lineItems.value
    invoiceData.value.invoiceTotal = invoiceTotal.value
    setSelectedInvoice(invoiceData.value)
    showInvoice.value = true
    invoicePreviewModal.value.show()
}

onBeforeMount(async () => {
    await getProfileList()

    if (invoiceData.value.lineItems.length) {
        lineItems.value = invoiceData.value.lineItems
    }
})

watch(invoiceData.value, (newVal) => {
    console.log('watch', newVal)
})

watchEffect(() => {
    if (props.newInvoice) {
        invoiceData.invoiceNumber = nextInvoiceNumber.value
    }
})
</script>

<template>
    <Card
        container-class="w-full gap-1 px-4 mx-auto md:w-10/12 lg:w-3/4 min-w-60"
    >
        <div class="w-full flex-ic-jb">
            <h4 class="mb-2 title-text">{{ title }}</h4>
            <div class="p-1 border rounded-lg">
                {{ handleFormat(invoiceData.status, 'title') }}
            </div>
        </div>
        <section class="w-full gap-1 px-4 mx-auto flex-col-ic-js">
            <div
                class="w-full gap-4 lg:gap-8 flex-col-is-js md:flex-ic-jb md:flex-row"
            >
                <BasicSelect
                    v-model="invoiceData.client"
                    data-test="invoice-client"
                    label="Client"
                    :options="userProfiles"
                    target-attr="full_name"
                    target-type="object"
                />
                <TextInput
                    v-model="invoiceData.invoiceNumber"
                    data-test="new-invoice-number"
                    label="Invoice Number"
                />
            </div>
            <div
                class="w-full gap-4 lg:gap-8 flex-col-is-js md:flex-ic-jb md:flex-row"
            >
                <DateInput
                    v-model="invoiceData.invoiceDate"
                    data-test="invoice-date"
                    label="Invoice Date"
                    type="date"
                />
                <DateInput
                    v-model.date="invoiceData.dueDate"
                    data-test="invoice-due-date"
                    label="Invoice Due Date"
                    type="date"
                />
            </div>
        </section>
        <section class="w-full gap-1 p-4 flex-col-is-js">
            <h3>Line Items</h3>
            <InvoiceLineItem
                v-for="(item, i) in lineItems"
                :key="item.id"
                :line-item="item"
                @delete-line-item="deleteLineItem"
                :item-index="i"
            />

            <Button
                text="Add Item"
                data-test="add-line-item"
                button-class="align-self-start"
                @click="addLineItem"
            />
        </section>
        <div class="w-full mb-3 flex-ic-jend">
            <p class="text-xl font-semibold">
                {{ handleFormat(invoiceTotal, 'currency') }}
            </p>
        </div>
        <div class="w-full flex-ic-jb">
            <Button
                :text="newInvoice ? `Submit` : `Save`"
                data-test="submit-invoice"
                @click="($event) => submitInvoice($event)"
            />
            <Button
                text="Preview"
                @click="($event) => previewInvoice($event)"
            />
        </div>
    </Card>
</template>
