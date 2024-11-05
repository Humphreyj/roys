<script setup>
import { watch, onMounted } from 'vue'

import { useDark, useToggle, useWindowSize } from '@vueuse/core'
// Components
import Button from '@/components/UI/Button.vue'
import Avatar from '@/components/UI/Avatar.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { usePrimaryStore } from '@/stores/primaryStore'
import { useRuntimeStore } from '@/stores/runtimeStore'
const props = defineProps({
    textClass: {
        type: String,
        default: '',
    },
    containerClass: {
        type: String,
        default: '',
    },
    iconClass: {
        type: String,
        default: '',
    },
})
const isDark = useDark()
const toggleDark = useToggle(isDark)
const { showSidebar } = storeToRefs(usePrimaryStore())
const { toggleSidebar } = usePrimaryStore()
const { width } = useWindowSize()
const { configOptions } = storeToRefs(useRuntimeStore())

watch(width, (newWidth) => {
    if (newWidth > 768) {
        showSidebar.value = true
    } else {
        showSidebar.value = false
    }
})

onMounted(() => {
    if (width.value > 768) {
        showSidebar.value = true
    } else {
        showSidebar.value = false
    }
})

import { useModalStore } from '@/stores/modalStore'
const { avatarModal } = storeToRefs(useModalStore())
</script>

<template>
    <section class="p-2 border-b border-gray-600 shadow-md flex-ie-jend">
        <h3 class="w-full text-xl font-bold primary-text md:hidden">
            {{ configOptions.clientName }}
        </h3>
        <div class="gap-2 flex-ie-jend">
            <Button v-if="width < 768" @click="toggleSidebar()" text="Bar" />

            <Button
                @click="toggleDark()"
                :text="isDark ? '&#9788;' : '&#9789;'"
            />
            <Avatar
                avatar-class="cursor-pointer size-10"
                @click="avatarModal.toggle"
            />
        </div>
    </section>
</template>
