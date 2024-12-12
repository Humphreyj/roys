<script setup>
// Components
import Card from '@/components/UI/Card.vue'
import Button from '@/components/UI/Button.vue'
import EzPdfLogo from '@/assets/EzPdfLogo.vue'
import TextInput from '@/components/inputs/TextInput.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

// Routing
import { RouterLink } from 'vue-router'

const { userLogin } = useAuthStore()
const { authData } = storeToRefs(useAuthStore())

// const props = defineProps({})
// const emit = defineEmits()

const handleLogin = async (authData) => {
    await userLogin(authData)
}
</script>

<template>
    <main class="w-screen h-screen transform flex-is-jc translate-y-1/4">
        <Card
            container-class="w-full gap-1 px-4 mx-auto md:w-2/3 lg:w-1/2 min-w-60"
        >
            <section class="gap-10 flex-col-ic-js">
                <div class="gap-3 flex-col-ic-js">
                    <EzPdfLogo class="size-16" />
                    <h1 class="text-xl font-semibold">Login</h1>
                </div>
                <div class="gap-4 flex-col-ic-jc">
                    <TextInput
                        v-model="authData.email"
                        data-test="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                    />
                    <TextInput
                        v-model="authData.password"
                        data-test="password"
                        label="Password"
                        type="password"
                        placeholder="password"
                    />

                    <Button
                        text="Login"
                        data-test="login-button"
                        @click="handleLogin(authData)"
                    />

                    <RouterLink :to="{ name: 'Sign Up' }">
                        <Button
                            text="Create Account"
                            data-test="create-account"
                        />
                    </RouterLink>
                </div>
            </section>
        </Card>
    </main>
</template>
