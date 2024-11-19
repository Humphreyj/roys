<script setup>
// Components
import Card from '@/components/UI/Card.vue'
import Button from '@/components/UI/Button.vue'
import EzPdfLogo from '@/assets/EzPdfLogo.vue'
// Pinia

// Routing
import { RouterLink } from 'vue-router'

// const props = defineProps({})
// const emit = defineEmits()
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
                <div class="gap-4 flex-ic-jc">
                    <RouterLink :to="{ name: 'Dashboard' }">
                        <Button text="Admin" />
                    </RouterLink>
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
