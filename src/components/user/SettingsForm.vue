<script setup>
// Components
import AddressFormSection from '../UI/AddressFormSection.vue'

import SearchableSelect from '../inputs/SearchableSelect.vue'
import Card from '../UI/Card.vue'
// import CompanySettingsForm from '../forms/CompanySettingsForm.vue'
import TextInput from '@/components/inputs/TextInput.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settingsStore'
import { useUserStore } from '@/stores/userStore'

// const props = defineProps({
//     settingsData: {
//         type: Object,
//     },
// })

const { currentUser } = storeToRefs(useUserStore())
const { userSettings } = storeToRefs(useSettingsStore())

const taxRates = [
    {
        label: 'Travis County - 8.25%',
        value: 0.0825,
    },
]

// const emit = defineEmits()
</script>

<template>
    <main class="w-full flex-ic-jb">
        <section class="w-1/4 flex-col-is-js">
            <TextInput
                v-model="userSettings.companyName"
                container-class="col-span-2"
                data-test="current-user-first-name "
                label="Company Name"
            />
            <h4
                class="mb-1 font-bold text-gray-900 dark:text-white dark:opacity-95"
            >
                Primary Contact
            </h4>
            <div class="gap-6 flex-ic-js">
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
            <AddressFormSection :address-data="userSettings.company_address" />
        </section>

        <section>
            <SearchableSelect
                v-model="userSettings.taxRate"
                label="Tax Rate"
                :options="taxRates"
                target-type="object"
            />
        </section>
    </main>
</template>
