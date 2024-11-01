<script setup>
import { computed, onBeforeMount } from 'vue'
// Components
import Avatar from '@/components/UI/Avatar.vue'
import Card from '@/components/UI/Card.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '@/stores/invoiceStore'
// import { useModalStore } from '@/stores/modalStore'
// Assets
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/solid'
// Utils
import { handleFormat } from '@/utils/formatText'

// const props = defineProps({})
// const emit = defineEmits()

const { invoiceList } = storeToRefs(useInvoiceStore())

// const { profileFormModal } = storeToRefs(useModalStore())

// const handleNavigation = async (user) => {
//     await handleUserSelect(user)
//     await router.push({ name: 'Profile Details', params: { id: user.id } })
// }
</script>

<template>
    <Card container-class="mx-auto my-2 border-none shadow box-shadow">
        <section class="primary-text">
            <header class="px-3 border-b flex-ic-jb h-14">
                <h4 class="text-xl font-semibold font-display">
                    Manage Invoices
                </h4>
                <!-- <RouterLink to="/profiles/new" class="border-none"> -->
                <h2
                    class="border-gray-700 cursor-pointer hover:border-b"
                    @click="profileFormModal.show"
                >
                    Create Invoice
                </h2>
                <!-- </RouterLink> -->
            </header>
            <div class="w-full gap-2 py-3 flex-col-ic-js">
                <section
                    v-for="invoice in invoiceList"
                    :key="invoice.id"
                    class="grid justify-between w-full grid-cols-4 gap-4 py-2 shadow dark:shadow-slate-600 dark:shadow-sm"
                >
                    <div class="gap-2 cursor-pointer flex-ic-js">
                        <p class="font-bold">
                            {{ invoice.invoiceNumber }}
                        </p>
                    </div>
                    <p class="font-bold">
                        {{ invoice.client.full_name }}
                    </p>
                    <p class="font-bold">
                        {{ handleFormat(invoice.dueDate, 'date') }}
                    </p>

                    <ChevronDoubleRightIcon class="cursor-pointer size-7" />
                </section>
            </div>
        </section>
    </Card>
</template>
