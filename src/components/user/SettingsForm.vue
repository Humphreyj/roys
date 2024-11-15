<script setup>
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

// const props = defineProps({
//     settingsData: {
//         type: Object,
//     },
// })

const { currentUser } = storeToRefs(useUserStore())
const { currentAccount } = storeToRefs(useAccountStore())

const taxRates = [
    {
        label: '8.25%',
        value: 0.0825,
    },
]

// const emit = defineEmits()
</script>

<template>
    <main class="w-full gap-8 p-2 flex-col-is-js md:flex-is-js md:flex-row">
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
            <div class="w-full gap-6 flex-col-ic-js md:flex-ic-js md:flex-row">
                <TextInput
                    v-model="currentAccount.phone"
                    data-test="current-account-phone"
                    label="Phone"
                />
                <TextInput
                    v-model="currentAccount.email"
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
                        v-model="currentAccount.primaryContact.first_name"
                        data-test="current-user-first-name"
                        label="First Name"
                    />
                    <TextInput
                        v-model="currentAccount.primaryContact.last_name"
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
        <Button text="Submit" />
    </main>
</template>
