import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'

// Mock Data

export const useInvoiceStore = defineStore('invoiceStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())
    const invoiceData = ref()

    const selectedInvoice = ref(null)
    const invoiceList = ref([])

    const setSelectedInvoice = (invoice) => {
        selectedInvoice.value = invoice
    }

    const getInvoiceList = () => {
        axios
            .get(`${apiRoot.value}/invoice`)
            .then((res) => {
                invoiceList.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getInvoiceById = (id) => {
        axios
            .get(`${apiRoot.value}/invoice/${id}`)
            .then((res) => {
                selectedInvoice.value = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const createNewInvoice = (invoiceData) => {
        const clientId = invoiceData.client.id
        const body = {
            clientId: clientId,
            ...invoiceData,
        }
        axios
            .post(`${apiRoot.value}/invoice/create`, body)
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
    }
    const values = {
        invoiceList,
        selectedInvoice,
        invoiceData,
    }
    return { ...actions, ...values }
})
