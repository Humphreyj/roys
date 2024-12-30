<script setup>
import { ref } from 'vue'
// Components
import Card from '@/components/UI/Card.vue'
import Button from '../UI/Button.vue'
import TextInput from '../inputs/TextInput.vue'
// Pinia
import { useAccountStore } from '@/stores/accountStore'
import { storeToRefs } from 'pinia'
// const props = defineProps({})
// const emit = defineEmits()

const email = ref('')

const { requestAppAccess } = useAccountStore()
const { accessRequested } = storeToRefs(useAccountStore())

const requestAccess = async () => {
    await requestAppAccess(email.value)
}
</script>

<template>
    <main class="py-20 flex-col-ic-js">
        <Card v-if="accessRequested" container-class="w-1/4 p-4 mx-auto">
            <section class="gap-4 mx-auto flex-col-is-jc">
                <h1 class="text-xl font-semibold">Request successful</h1>
                <p>Please check your email for instructions.</p>
            </section>
        </Card>
        <Card v-else container-class="w-1/4 mx-auto ">
            <section class="gap-4 mx-auto text-center flex-col-ic-js">
                <h1 class="text-xl font-semibold">Request Access</h1>
                <p>Get access to the test version during development.</p>

                <TextInput
                    v-model="email"
                    container-class="w-11/12 mx-auto"
                    label="Email"
                    type="email"
                    placeholder="Email"
                />

                <Button text="Request Access" @click="requestAccess" />
            </section>
        </Card>
        <Button
            v-if="accessRequested"
            text="Resend Request"
            @click="requestAccess"
        />
    </main>
</template>
