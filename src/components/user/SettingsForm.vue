<script setup>
import { ref } from 'vue'
// Components
// Pinia
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settingsStore'
import { useUserStore } from '@/stores/userStore'

const props = defineProps({
    settingsData: {
        type: Object,
    },
})

const { currentUser } = storeToRefs(useUserStore())
const { userSettings } = storeToRefs(useSettingsStore())

// const emit = defineEmits()
</script>

<template>
    <main class="w-full">
        <p>{{ JSON.stringify(currentUser) }}</p>
        <p>{{ JSON.stringify(userSettings) }}</p>
    </main>
</template>
