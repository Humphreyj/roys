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
// Utils
import { useNotify } from '@/utils/notificationUtils'
// Services
import { createNewClient } from '@/services/clientServices'

export const useInvoiceStore = defineStore('invoiceStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())
    const invoiceData = ref({})

    const selectedInvoice = ref({})
    const newInvoice = ref({})
    const invoiceList = ref(null)
    const totalInvoiced = ref(0)
    const nextInvoiceNumber = ref(null)

    const invoiceBeingEdited = ref(false)

    const setSelectedInvoice = (invoice) => {
        selectedInvoice.value = invoice
    }

    const getInvoiceNumber = async () => {
        const { currentAccount } = storeToRefs(useAccountStore())
        const accountId = currentAccount.value.id
        if (!accountId) return
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
        if (!accountId) return
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
                useNotify('error', 'Error', err.response.data, 3000)
                console.log(err)
            })
    }

    const addClientToInvoice = async (client) => {
        const newClient = await createNewClient(client)
        if (newClient) {
            newInvoice.value.client = newClient
            newInvoice.value.clientId = newClient.id
        }
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
                    useNotify(
                        'success',
                        'Success',
                        `Invoice created for ${invoiceData.client.full_name}`,
                        3000
                    )
                    selectedInvoice.value = res.data
                    invoiceList.value.push(res.data)

                    router.push({
                        name: 'Invoice Details',
                        params: { id: res.data.id },
                    })
                })
                .catch((err) => {
                    console.log(err)
                    useNotify('error', 'Error', err.response.data, 3000)
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
            .then(async (res) => {
                useNotify('success', 'Success', 'Invoice updated', 3000)
                await getInvoiceList()
            })
            .catch((err) => {
                console.log(err)
                useNotify('error', 'Error', err.response.data, 3000)
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
                useNotify('error', 'Error', err.response.data, 3000)
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
        addClientToInvoice,
    }
    const values = {
        invoiceBeingEdited,
        invoiceList,
        selectedInvoice,
        newInvoice,
        invoiceData,
        nextInvoiceNumber,
        totalInvoiced,
    }
    return { ...actions, ...values }
})
