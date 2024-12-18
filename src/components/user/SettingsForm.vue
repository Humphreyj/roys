<script setup>
import { watch } from 'vue'
// Components
import AddressFormSection from '../UI/AddressFormSection.vue'
import Button from '../UI/Button.vue'
import SearchableSelect from '../inputs/SearchableSelect.vue'
import TextInput from '@/components/inputs/TextInput.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/accountStore'

// Routing
import { useRoute } from 'vue-router'
// Validation
import useValidate from '@vuelidate/core'
import { accountRules } from '@/validation/accountValidation'

// const props = defineProps({
//     settingsData: {
//         type: Object,
//     },
// })

const { currentAccount } = storeToRefs(useAccountStore())
const { getAccountById, updateAccount } = useAccountStore()
const route = useRoute()

const v$ = useValidate(accountRules, currentAccount)

const taxRates = [
    {
        label: '8.25%',
        value: 0.0825,
    },
]

const handleAccountUpdate = async (e, account) => {
    e.preventDefault()
    const isFormCorrect = await v$.value.$validate()
    if (!isFormCorrect) {
        return
    }
    await updateAccount(account)
}

watch(currentAccount, async () => {
    if (!currentAccount.value) {
        await getAccountById(route.params.id)
    }
})

// const emit = defineEmits()
</script>

<template>
    <main class="w-full gap-8 p-2 flex-col-is-js md:flex-is-js md:flex-row">
        <div v-if="currentAccount.id" class="w-full">
            <section class="w-full md:w-1/3 flex-col-is-js">
                <h4
                    class="my-2 text-lg font-bold text-gray-900 border-b border-gray-900 dark:text-white dark:opacity-95"
                >
                    Company Info
                </h4>

                <TextInput
                    v-model="currentAccount.companyName"
                    container-class="col-span-2"
                    data-test="company-name"
                    label="Company Name"
                    :error="v$.companyName.$error"
                    :error-messages="v$.companyName.$silentErrors"
                />
                <div
                    class="w-full gap-6 flex-col-ic-js md:flex-ic-js md:flex-row"
                >
                    <TextInput
                        v-model="currentAccount.companyPhone"
                        data-test="company-phone"
                        label="Phone"
                        format="phone"
                        max-length="12"
                        :error="v$.companyPhone.$error"
                        :error-messages="v$.companyPhone.$silentErrors"
                    />
                    <TextInput
                        v-model="currentAccount.companyEmail"
                        data-test="company-email"
                        label="Email"
                        :error="v$.companyEmail.$error"
                        :error-messages="v$.companyEmail.$silentErrors"
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
                <!-- <section class="w-full flex-col-is-js">
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
                            label="First Name"
                            data-test="primary-contact-first-name"
                        />
                        <TextInput
                            v-model="currentUser.last_name"
                            data-test="primary-contact-last-name"
                            label="Last Name"
                        />
                    </div>
                </section> -->
            </section>

            <section class="w-full md:w-1/3 flex-col-is-js">
                <section class="w-full flex-col-is-js">
                    <h4
                        class="my-2 text-lg font-bold text-gray-900 border-b border-gray-900 dark:text-white dark:opacity-95"
                    >
                        Billing Info
                    </h4>
                    <SearchableSelect
                        v-model="currentAccount.billingInfo.taxRate"
                        label="Tax Rate"
                        :options="taxRates"
                        target-type="object"
                    />
                </section>
            </section>
            <Button
                text="Save"
                @click="($event) => handleAccountUpdate($event, currentAccount)"
                data-test="save-settings"
            />
        </div>
        <div v-else>Loading</div>
    </main>
</template>
