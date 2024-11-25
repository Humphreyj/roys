import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
// Routing
import router from '@/router'

// Mock Data

export const useInvoiceStore = defineStore('invoiceStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())
    const invoiceData = ref()

    const selectedInvoice = ref(null)
    const invoiceList = ref([])

    const invoiceBeingEdited = ref(false)

    const setSelectedInvoice = (invoice) => {
        selectedInvoice.value = invoice
    }

    const getInvoiceList = async () => {
        axios
            .get(`${apiRoot.value}/invoice`)
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
            .then((res) => {
                selectedInvoice.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createNewInvoice = async (invoiceData) => {
        const clientId = invoiceData.client.id
        const body = {
            clientId: clientId,
            ...invoiceData,
        }
        axios
            .post(`${apiRoot.value}/invoice/create`, body)
            .then((res) => {
                console.log(res.data)

                router.push({
                    name: 'Invoice Details',
                    params: { id: res.data.id },
                })
            })
            .catch((err) => {
                console.log(err)
            })
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
    }
    const values = {
        invoiceBeingEdited,
        invoiceList,
        selectedInvoice,
        invoiceData,
    }
    return { ...actions, ...values }
})