<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
// Components
import Sidedrawer from '@/components/UI/Sidedrawer.vue'
import ActionDrawer from '@/components/UI/ActionDrawer.vue'
import AppHeader from '@/components/UI/AppHeader.vue'
import ModalContainer from '@/components/UI/ModalContainer.vue'
import NotificationsGroup from './components/Notifications/NotificationsGroup.vue'
const route = useRoute()

const routeNames = ['send invoice', 'Log In', 'Sign Up', 'Request Access']
const showHeader = computed(() => !routeNames.includes(route.name))
</script>

<template>
    <div
        class="overflow-y-auto h-dvh bg-appBackground dark:bg-appBackgroundDark flex-is-js"
    >
        <Sidedrawer v-if="showHeader" />

        <ModalContainer />

        <section class="w-full overflow-y-scroll">
            <AppHeader v-if="showHeader" />
            <NotificationsGroup />
            <RouterView v-slot="{ Component, route }">
                <!-- Use a custom transition or fallback to `fade` -->
                <!-- <transition :name="route.meta.transition || 'fade'"> -->
                <component :is="Component" />
                <!-- </transition> -->
            </RouterView>
        </section>
        <!-- <ActionDrawer /> -->
    </div>
</template>

<style>
/* width */
::-webkit-scrollbar {
    width: 1px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #555;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
