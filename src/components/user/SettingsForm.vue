<script setup>
import { watchEffect } from 'vue'
// Components
import AddressFormSection from '../UI/AddressFormSection.vue'
import Button from '../UI/Button.vue'
import SearchableSelect from '../inputs/SearchableSelect.vue'
import Card from '../UI/Card.vue'
// import CompanySettingsForm from '../forms/CompanySettingsForm.vue'
import TextInput from '@/components/inputs/TextInput.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/accountStore'
import { useUserStore } from '@/stores/userStore'
// Routing
import { useRoute } from 'vue-router'

// const props = defineProps({
//     settingsData: {
//         type: Object,
//     },
// })

const { currentUser } = storeToRefs(useUserStore())
const { currentAccount } = storeToRefs(useAccountStore())
const { getAccountById, updateAccount } = useAccountStore()
const route = useRoute()

const taxRates = [
    {
        label: '8.25%',
        value: 0.0825,
    },
]

const handleAccountUpdate = async (e, account) => {
    e.preventDefault()
    await updateAccount(account)
}

watchEffect(async () => {
    if (!currentAccount.value.id) {
        await getAccountById(route.params.id)
    }
    console.log('currentAccount', currentAccount.value)
})

// const emit = defineEmits()
</script>

<template>
    <main class="w-full gap-8 p-2 flex-col-is-js md:flex-is-js md:flex-row">
        <div v-if="currentAccount" class="w-full">
            <section class="w-full md:w-1/3 flex-col-is-js">
                <h4
                    class="my-2 text-lg font-bold text-gray-900 border-b border-gray-900 dark:text-white dark:opacity-95"
                >
                    Company Info
                </h4>

                <TextInput
                    v-model="currentAccount.companyName"
                    container-class="col-span-2"
                    data-test="current-user-first-name "
                    label="Company Name"
                />
                <div
                    class="w-full gap-6 flex-col-ic-js md:flex-ic-js md:flex-row"
                >
                    <TextInput
                        v-model="currentAccount.companyPhone"
                        data-test="current-account-phone"
                        label="Phone"
                        format="phone"
                        max-length="12"
                    />
                    <TextInput
                        v-model="currentAccount.companyEmail"
                        data-test="current-account-email"
                        label="Email"
                    />
                </div>

                <section class="w-full flex-col-is-js">
                    <h4
                        class="my-2 font-bold text-gray-900 dark:text-white dark:opacity-95"
                    >
                        Business Address
                    </h4>
                    <AddressFormSection
                        :address-data="currentAccount.companyAddress"
                    />
                </section>
                <section class="w-full flex-col-is-js">
                    <h4
                        class="my-2 font-bold text-gray-900 dark:text-white dark:opacity-95"
                    >
                        Primary Contact
                    </h4>

                    <div
                        class="w-full gap-6 flex-col-ic-js md:flex-ic-js md:flex-row"
                    >
                        <TextInput
                            v-model="currentUser.first_name"
                            data-test="current-user-first-name"
                            label="First Name"
                        />
                        <TextInput
                            v-model="currentUser.last_name"
                            data-test="current-user-last-name"
                            label="Last Name"
                        />
                    </div>
                </section>
            </section>

            <section class="w-full md:w-1/3 flex-col-is-js">
                <section class="w-full flex-col-is-js">
                    <h4
                        class="my-2 text-lg font-bold text-gray-900 border-b border-gray-900 dark:text-white dark:opacity-95"
                    >
                        Billing Info
                    </h4>
                    <SearchableSelect
                        v-model="currentAccount.taxRate"
                        label="Tax Rate"
                        :options="taxRates"
                        target-type="object"
                    />
                </section>
            </section>
            <Button
                text="Submit"
                @click="($event) => handleAccountUpdate($event, currentAccount)"
            />
        </div>
        <div v-else>Loading</div>
    </main>
</template>
