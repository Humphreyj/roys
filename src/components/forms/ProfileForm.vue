<script setup>
import { ref } from 'vue'
// Components
import AddressFormSection from '../UI/AddressFormSection.vue'
import Card from '@/components/UI/Card.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import Button from '@/components/UI/Button.vue'
// Data

const props = defineProps({
    formTitle: {
        type: String,
        default: 'Form Title',
    },
    data: {
        type: Object,
        default: {},
    },
})

const userData = ref(props.data)
const emit = defineEmits(['handle-submit'])

const handleSubmit = (e) => {
    e.preventDefault()
    emit('handle-submit', userData.value)
}
</script>

<template>
    <Card container-class="w-11/12 gap-1 p-4 mx-auto md:w-1/3 min-w-60">
        <section class="w-full gap-1 p-4 mx-auto flex-col-ic-js">
            <h4 class="my-2 title-text">{{ formTitle }}</h4>
            <TextInput
                v-model="userData.first_name"
                data-test="first-name"
                label="First Name"
                input-class="min-w-60"
            />
            <TextInput
                v-model="userData.last_name"
                data-test="last-name"
                label="Last Name"
                input-class="min-w-60"
            />
            <AddressFormSection :address-data="userData.address" />

            <TextInput
                v-model="userData.email"
                data-test="user_email"
                label="Email"
            />
            <TextInput
                v-model="userData.phone"
                data-test="user_phone"
                label="Phone Number"
                format="phone"
                max-length="12"
            />
            <Button
                data-test="basic-form-submit"
                text="Submit"
                button-class="mt-6 bg-green-500"
                @click="($event) => handleSubmit($event)"
            />
        </section>
    </Card>
</template>
