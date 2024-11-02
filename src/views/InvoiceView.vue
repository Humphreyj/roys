<script setup>
import { onBeforeMount } from 'vue'
// Components
// Routing
import { RouterView } from 'vue-router'
// Pinia
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '@/stores/invoiceStore'
// Utils
// const props = defineProps({})
// const emit = defineEmits()

const { invoiceList } = storeToRefs(useInvoiceStore())
const { getInvoiceList } = useInvoiceStore()
onBeforeMount(async () => {
    if (!invoiceList.value.length) {
        await getInvoiceList()
    }
})
</script>

<template>
    <section
        class="w-full max-w-[75rem] mx-auto primary-text px-2 font-display flex-col-ic-js"
    >
        <!-- <InvoiceForm /> -->
        <RouterView />
    </section>
</template>
