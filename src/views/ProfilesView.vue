<script setup>
import { watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import router from '@/router'
// Components
// Pinia
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profileStore'
// Assets
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/outline'
// const props = defineProps({})
// const emit = defineEmits()
const route = useRoute()
const { userProfiles } = storeToRefs(useProfileStore())
const { getProfileList } = useProfileStore()

const goBack = () => {
    router.push({ name: 'Manage Profiles' })
}

watch(
    () => userProfiles.value,
    async () => {
        if (!userProfiles.value.length) {
            await getProfileList()
        }
    }
)
</script>

<template>
    <main
        class="relative w-full max-w-[75rem] mx-auto pt-4 px-2 flex-col-is-js"
    >
        <ArrowLeftCircleIcon
            v-if="route.name !== 'Manage Profiles'"
            class="absolute cursor-pointer left-5 size-8 primary-text"
            @click="goBack"
        />
        <RouterView />
    </main>
</template>
