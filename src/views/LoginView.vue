<script setup>
// Components
import Card from '@/components/UI/Card.vue'
import Button from '@/components/UI/Button.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from '@/stores/runtimeStore'
// Routing
import { RouterLink } from 'vue-router'
import router from '@/router'
// const props = defineProps({})
// const emit = defineEmits()
const { configOptions } = storeToRefs(useRuntimeStore())
</script>

<template>
    <main class="w-screen h-screen transform flex-is-jc translate-y-1/4">
        <Card
            container-class="w-full gap-1 px-4 mx-auto md:w-2/3 lg:w-1/2 min-w-60"
        >
            <section class="gap-10 flex-col-ic-js">
                <div class="gap-3 flex-col-ic-js">
                    <h1 class="text-2xl font-semibold">
                        {{ configOptions.clientName }}
                    </h1>
                    <h1 class="text-xl font-semibold">Login</h1>
                </div>
                <div class="gap-4 flex-ic-jc">
                    <RouterLink :to="{ name: 'Dashboard' }">
                        <Button text="Admin" />
                    </RouterLink>
                    <Button text="Client" />
                </div>
            </section>
        </Card>
    </main>
</template>
