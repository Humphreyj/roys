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

const handleNavigation = () => {
    if (width.value < 768) {
        toggleSidebar()
    }
}

const classes = getStyles(props, 'sidebar')
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
                <h3 :class="classes.titleClass">EZPDF</h3>
                <div :class="classes.navContainerClass">
                    <RouterLink
                        to="/dashboard"
                        data-test="dashboard-link"
                        :class="classes.navLinkClass"
                        @click="handleNavigation"
                        ><div class="gap-1 flex-is-js">
                            <HomeIcon class="w-6 h-6" />
                            <p>Dashboard</p>
                        </div></RouterLink
                    >
                    <RouterLink
                        to="/invoice"
                        data-test="invoices-link"
                        :class="classes.navLinkClass"
                        @click="handleNavigation"
                    >
                        <div class="gap-1 flex-is-js">
                            <DocumentCurrencyDollarIcon class="w-6 h-6" />
                            <p>Invoices</p>
                        </div>
                    </RouterLink>

                    <RouterLink
                        to="/profiles"
                        data-test="profiles-link"
                        :class="classes.navLinkClass"
                        @click="handleNavigation"
                    >
                        <div class="gap-1 flex-is-js">
                            <UserGroupIcon class="w-6 h-6" />
                            <p>Clients</p>
                        </div>
                    </RouterLink>
                    <!-- <RouterLink
                        :to="`/settings/${currentUser.role}`"
                        :class="classes.navLinkClass"
                        @click="handleNavigation"
                        >Settings</RouterLink
                    > -->
                </div>
            </section>
        </section>
    </transition>
</template>
