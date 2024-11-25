<script setup>
// Components
import InvoiceForm from './InvoiceForm.vue'
// const props = defineProps({})
// const emit = defineEmits()
</script>

<template>
    <main class="w-full py-12 flex-is-jc">
        <InvoiceForm :new-invoice="true" />
    </main>
</template>
