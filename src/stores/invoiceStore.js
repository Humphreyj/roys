import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// Mock Data

export const useInvoiceStore = defineStore('invoiceStore', () => {
    const invoiceData = ref()

    const getInvoiceById = (id) => {
        axios
            .get(`http://127.0.0.1:8080/api/invoice/${id}`)
            .then((res) => {
                console.log(res.data)
                invoiceData.value = res.data
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
        console.log('in store', body)
        axios
            .post('http://127.0.0.1:8080/api/invoice/create', body)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const actions = {
        getInvoiceById,
        createNewInvoice,
    }
    const values = {
        invoiceData,
    }
    return { ...actions, ...values }
})
