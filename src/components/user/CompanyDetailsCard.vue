<script setup>
// Components
import Button from '../UI/Button.vue'
import Card from '../UI/Card.vue'
import TextBlock from '../UI/TextBlock.vue'
const props = defineProps({
    currentAccount: {
        type: Object,
        required: true,
    },
})
const emit = defineEmits(['toggle-editing'])
</script>

<template>
    <Card container-class="relative w-1/3 p-3">
        <Button
            button-class="absolute right-3"
            data-test="edit-account"
            text="Edit"
            @click="emit('toggle-editing')"
        />
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
