<script setup>
// Components
import Card from '../UI/Card.vue'
import TextBlock from '../UI/TextBlock.vue'
const props = defineProps({
    currentAccount: {
        type: Object,
        required: true,
    },
})
// const emit = defineEmits()
</script>

<template>
    <Card container-class="w-1/3">
        <TextBlock
            label="Company Name"
            :text-content="currentAccount.companyName"
        />
        <TextBlock
            label="Company Phone"
            :text-content="currentAccount.companyPhone"
        />
        <TextBlock
            label="Company Email"
            :text-content="currentAccount.companyEmail"
        />
    </Card>
</template>
