<script setup>
// Components
import Button from '../UI/Button.vue'
import Card from '../UI/Card.vue'
import TextBlock from '../UI/TextBlock.vue'
const props = defineProps({
    currentUser: {
        type: Object,
        required: true,
    },
})
const emit = defineEmits(['toggle-editing'])
</script>

<template>
    <Card container-class="relative p-3 w-max">
        <Button
            button-class="absolute right-3"
            data-test="edit-account"
            text="Edit"
            @click="emit('toggle-editing')"
        />
        <TextBlock label="Contact Info" :text-content="currentUser.full_name" />
        <TextBlock :text-content="currentUser.phone" />
        <TextBlock :text-content="currentUser.email" />
    </Card>
</template>
