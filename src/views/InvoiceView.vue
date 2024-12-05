<script setup>
import { onMounted, onBeforeMount } from 'vue'
// Components
// Routing
import { RouterView } from 'vue-router'
// Pinia
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '@/stores/invoiceStore'
// Assets

// const props = defineProps({})
// const emit = defineEmits()

const { invoiceList, nextInvoiceNumber } = storeToRefs(useInvoiceStore())
const { getInvoiceList, getInvoiceNumber } = useInvoiceStore()
onBeforeMount(async () => {
    if (!invoiceList.value.length) {
        await getInvoiceList()
    }
})

onMounted(async () => {
    if (!nextInvoiceNumber.value) {
        await getInvoiceNumber()
    }
})
</script>

<template>
    <section
        class="w-full max-w-[75rem] mx-auto primary-text px-2 font-display flex-col-ic-js"
    >
        <RouterView />
    </section>
</template>
