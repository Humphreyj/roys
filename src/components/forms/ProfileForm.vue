<script setup>
import { ref } from 'vue'
// Components
import AddressFormSection from '../UI/AddressFormSection.vue'
import Card from '@/components/UI/Card.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import Button from '@/components/UI/Button.vue'
// Data
// Validation
import useValidate from '@vuelidate/core'
import { profileRules } from '@/validation/profileValidation'

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
const v$ = useValidate(profileRules, props.data)

const handleSubmit = async (e) => {
    e.preventDefault()
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) {
        return
    }
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
                :error="v$.first_name.$error"
                :error-messages="v$.first_name.$silentErrors"
            />
            <TextInput
                v-model="userData.last_name"
                data-test="last-name"
                label="Last Name"
                input-class="min-w-60"
                :error="v$.last_name.$error"
                :error-messages="v$.last_name.$silentErrors"
            />
            <!-- <AddressFormSection :address-data="userData.address" /> -->

            <TextInput
                v-model="userData.email"
                data-test="user-email"
                label="Email"
                :error="v$.email.$error"
                :error-messages="v$.email.$silentErrors"
            />
            <TextInput
                v-model="userData.password"
                data-test="user-password"
                label="Password"
                type="password"
                :error="v$.password.$error"
                :error-messages="v$.password.$silentErrors"
            />
            <!-- <TextInput
                v-model="userData.phone"
                data-test="user-phone"
                label="Phone Number"
                format="phone"
                max-length="12"
                :error="v$.phone.$error"
                :error-messages="v$.phone.$silentErrors"
            /> -->
            <Button
                data-test="profile-submit"
                text="Submit"
                button-class="mt-6 bg-green-500"
                @click="($event) => handleSubmit($event)"
            />
        </section>
    </Card>
</template>
