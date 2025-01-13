<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
// Components
import {
    HomeIcon,
    DocumentCurrencyDollarIcon,
    UserGroupIcon,
} from '@heroicons/vue/24/outline'

// Pinia
import { usePrimaryStore } from '@/stores/primaryStore'
import { useRuntimeStore } from '@/stores/runtimeStore'
import { useUserStore } from '@/stores/userStore'
// Utils
import { getStyles } from '@/composables/getStyles'
const props = defineProps({
    textClass: {
        type: String,
        default: '',
    },
    backdropClass: {
        type: String,
        default: '',
    },
    containerClass: {
        type: String,
        default: '',
    },
    titleClass: {
        type: String,
        default: '',
    },
    navContainerClass: {
        type: String,
        default: '',
    },
    navLinkClass: {
        type: String,
        default: '',
    },
})

const { configOptions } = storeToRefs(useRuntimeStore())

const { showSidebar } = storeToRefs(usePrimaryStore())
const { toggleSidebar } = usePrimaryStore()
const { width } = useWindowSize()
const { currentUser } = storeToRefs(useUserStore())

// const emit = defineEmits()

const classes = getStyles(props, 'actionDrawer')
</script>

<template>
    <transition name="fade">
        <section>
            <div
                v-if="showSidebar"
                id="backdrop"
                :class="classes.backdropClass"
                @click="toggleSidebar()"
            ></div>

            <section v-if="showSidebar" :class="classes.containerClass">
                <h3 :class="classes.titleClass">
                    {{ configOptions.clientName }}
                </h3>
            </section>
        </section>
    </transition>
</template>
