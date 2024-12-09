import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import { useAccountStore } from './accountStore'
import { useProfileStore } from './profileStore'
// Routing
import router from '@/router'

// Mock Data

export const useInvoiceStore = defineStore('invoiceStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())
    const invoiceData = ref({})

    const selectedInvoice = ref({})
    const invoiceList = ref([])
    const totalInvoiced = ref(0)
    const nextInvoiceNumber = ref(null)

    const invoiceBeingEdited = ref(false)

    const setSelectedInvoice = (invoice) => {
        selectedInvoice.value = invoice
    }

    const getInvoiceNumber = async () => {
        const { currentAccount } = storeToRefs(useAccountStore())
        const accountId = currentAccount.value.id
        axios
            .get(`${apiRoot.value}/settings/${accountId}`)
            .then((res) => {
                nextInvoiceNumber.value = res.data.nextInvoiceNumber
                totalInvoiced.value = res.data.totalInvoiced
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getInvoiceList = async () => {
        const { currentAccount } = storeToRefs(useAccountStore())
        const accountId = currentAccount.value.id

        axios
            .get(`${apiRoot.value}/invoice/list/${accountId}`)
            .then((res) => {
                invoiceList.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getInvoiceById = async (id) => {
        axios
            .get(`${apiRoot.value}/invoice/${id}`)
            .then(async (res) => {
                selectedInvoice.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createNewInvoice = async (invoiceData) => {
        // const { currentAccount } = storeToRefs(useAccountStore())
        // const accountId = currentAccount.value.id
        try {
            // invoiceData.accountId = accountId
            invoiceData.clientId = invoiceData.client.id
            selectedInvoice.value = null
            axios
                .post(`${apiRoot.value}/invoice/create`, invoiceData)
                .then((res) => {
                    selectedInvoice.value = res.data
                    invoiceList.value.push(res.data)

                    router.push({
                        name: 'Invoice Details',
                        params: { id: res.data.id },
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log('Pre-request error creating invoice ', error)
        }
    }
    const updateInvoice = async (invoiceData) => {
        const clientId = invoiceData.client.id
        const body = {
            clientId: clientId,
            ...invoiceData,
        }
        axios
            .put(`${apiRoot.value}/invoice/update`, body)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const sendInvoice = async (invoice) => {
        const invoiceRequest = {
            invoiceId: invoice.id,
            client: invoice.client,
            invoiceNumber: invoice.invoiceNumber,
        }
        axios
            .post(`${apiRoot.value}/invoice/send-invoice`, invoiceRequest)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const actions = {
        getInvoiceList,
        getInvoiceById,
        createNewInvoice,
        setSelectedInvoice,
        sendInvoice,
        updateInvoice,
        getInvoiceNumber,
    }
    const values = {
        invoiceBeingEdited,
        invoiceList,
        selectedInvoice,
        invoiceData,
        nextInvoiceNumber,
        totalInvoiced,
    }
    return { ...actions, ...values }
})
