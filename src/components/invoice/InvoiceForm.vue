<script setup>
import { ref, computed, onBeforeMount, watchEffect, watch } from 'vue'
// Components
import Button from '@/components/UI/Button.vue'
import Card from '@/components/UI/Card.vue'
import DateInput from '../inputs/DateInput.vue'
import InvoiceLineItem from './InvoiceLineItem.vue'
import BasicSelect from '@/components/inputs/BasicSelect.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import PercentInput from '@/components/inputs/PercentInput.vue'
import TextArea from '../inputs/TextArea.vue'

// Pinia
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profileStore'
import { useInvoiceStore } from '@/stores/invoiceStore'
import { useModalStore } from '@/stores/modalStore'
import { useAccountStore } from '@/stores/accountStore'
// Utils
import { v4 as uuidv4 } from 'uuid'
import { handleFormat } from '@/utils/formatText'
import { parse } from 'date-fns'
// Validation
import useValidate from '@vuelidate/core'
import { invoiceRules } from '@/validation/invoiceValidation'

const { getProfileList } = useProfileStore()
const { userProfiles } = storeToRefs(useProfileStore())
const { createNewInvoice, setSelectedInvoice, updateInvoice, getInvoiceNumber } =
    useInvoiceStore()
const { invoiceBeingEdited, nextInvoiceNumber } = storeToRefs(useInvoiceStore())
const { invoicePreviewModal, profileFormModal } = storeToRefs(useModalStore())
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
        client: 'Select Client',
        invoiceNumber: nextInvoiceNumber.value,
        // invoiceDate: new Date().toISOString().split('T')[0],
        invoiceDate: parse(new Date().toISOString().split('T')[0], 'yyyy-MM-dd', new Date()),
        dueDate: '',
        status: 'draft',
        lineItems: [],
        invoiceTotal: 0,
        comments: '',
        discount: null,
        totalDiscount: 0,
    }
)

const v$ = useValidate(invoiceRules, invoiceData.value)

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
    if (invoiceData.value.discount) {
        invoiceData.value.totalDiscount = result * invoiceData.value.discount
        result -= invoiceData.value.discount
    }
    return result
})

const submitInvoice = async (e) => {
    e.preventDefault()
    invoiceData.value.lineItems = lineItems.value
    invoiceData.value.invoiceTotal = invoiceTotal.value
    const isFormCorrect = await v$.value.$validate()
    console.log("isFormCorrect", isFormCorrect)
    if (!isFormCorrect) {
        return
    }
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


watchEffect(async () => {
    
    if (props.newInvoice) {
        invoiceData.invoiceNumber = nextInvoiceNumber.value
    }
    if(!invoiceData.value.invoiceNumber){
        invoiceData.value.invoiceNumber = nextInvoiceNumber.value
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
            <div class="w-full gap-2 flex-ic-js">

                <BasicSelect
                    v-model="invoiceData.client"
                    data-test="invoice-client"
                    container-class="w-2/3"
                    label="Client"
                    :options="userProfiles"
                    placeholder="Select Client"
                    target-attr="full_name"
                    target-type="object"
                    :error="v$.client.$error"
                    :error-messages="v$.client.$silentErrors"

                />
                <!-- <Button
                    text="New Client"
                    button-class="text-xs w-max"
                    data-test="create-client"
                    @click="profileFormModal.show"
                /> -->


            </div>
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

                    :error="v$.invoiceDate.$error"
                    :error-messages="v$.invoiceDate.$silentErrors"
                />
                <DateInput
                    v-model.date="invoiceData.dueDate"
                    data-test="invoice-due-date"
                    label="Invoice Due Date"
                    type="date"
                    container-class="relative"
                    :error="v$.dueDate.$error"
                    :error-messages="v$.dueDate.$silentErrors"
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
            <p
            v-if="v$.lineItems.$error && v$.lineItems.$silentErrors.length"
            class="mt-1 text-xs text-red-700 dark:text-red-400"
        >
            {{ v$.lineItems.$silentErrors[0].$message }}
        </p>
        </section>
        <section class="gap-4 flex-is-jb">
            <TextArea
                v-model="invoiceData.comments"
                data-test="invoice-comments"
                label="Additional Comments"
            />
            <PercentInput
                v-model.number="invoiceData.discount"
                container-class="relative w-1/2"
                data-test="invoice-discount"
                label="Discount"
                type="number"
                format="float"
            />
        </section>
        <div class="w-full mb-3 flex-ic-jend">
            <div class="flex-col-is-je">
                <div v-if="invoiceData.totalDiscount">
                    <p>Discount</p>
                    <p class="text-xl font-semibold">
                        {{ handleFormat(invoiceData.totalDiscount, 'currency') }}
                    </p>

                </div>
                <div>

                    <p class="text-xl font-semibold">
                        <p>Total</p>
                        {{ handleFormat(invoiceTotal, 'currency') }}
                    </p>
                </div>
            </div>
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
