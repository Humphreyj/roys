<script setup>
import { computed, watchEffect } from 'vue'
// Components
import Avatar from '@/components/UI/Avatar.vue'
import Card from '@/components/UI/Card.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profileStore'
import { useModalStore } from '@/stores/modalStore'
import { useAccountStore } from '@/stores/accountStore'
// Assets
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/solid'
// Utils
import router from '../../router'
import { useWindowSize } from '@vueuse/core'
// const props = defineProps({})
// const emit = defineEmits()

const { userProfiles } = storeToRefs(useProfileStore())
const { handleUserSelect, getProfileList } = useProfileStore()
const { profileFormModal } = storeToRefs(useModalStore())
const { currentAccount } = storeToRefs(useAccountStore())

const handleNavigation = async (user) => {
    await handleUserSelect(user)
    await router.push({ name: 'Profile Details', params: { id: user.id } })
}
const { height } = useWindowSize()

const listContainerHeight = computed(() => height.value * 0.6)

watchEffect(async () => {
    if (!userProfiles.value && currentAccount.value.id) {
        await getProfileList()
    }
})
</script>

<template>
    <Card container-class="mx-auto my-2 border-none shadow box-shadow">
        <section class="px-2 primary-text">
            <header class="px-3 border-b flex-ic-jb h-14">
                <h4 class="text-xl font-semibold font-display">
                    Manage Profiles
                </h4>
                <!-- <RouterLink to="/profiles/new" class="border-none"> -->
                <h2
                    data-test="create-profile"
                    class="border-gray-700 cursor-pointer hover:border-b"
                    @click="profileFormModal.show"
                >
                    Create Profile
                </h2>
                <!-- </RouterLink> -->
            </header>
            <div
                v-if="userProfiles"
                class="w-full gap-2 py-3 overflow-y-scroll flex-col-ic-js max-h-[calc(90vh-10rem)]"
            >
                <section
                    v-for="user in userProfiles"
                    :key="user.id"
                    class="w-full px-3 py-2 shadow dark:shadow-slate-600 dark:shadow-sm flex-is-jb"
                >
                    <div class="w-full gap-4 flex-ic-jb">
                        <div
                            class="gap-2 cursor-pointer flex-ic-js"
                            @click="handleNavigation(user)"
                        >
                            <Avatar
                                :username="`${user.first_name} ${user.last_name}`"
                                size="15"
                            />
                            <p class="font-bold">
                                {{ `${user.first_name} ${user.last_name}` }}
                            </p>
                        </div>

                        <ChevronDoubleRightIcon
                            class="cursor-pointer size-7"
                            @click="handleNavigation(user)"
                        />
                    </div>
                </section>
            </div>
        </section>
    </Card>
</template>
