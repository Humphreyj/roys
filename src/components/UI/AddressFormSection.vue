<script setup>
// Components
import SearchableSelect from '../inputs/SearchableSelect.vue'
import TextInput from '@/components/inputs/TextInput.vue'
// Data
// Data
import states from '@/constants/states'
const props = defineProps({
    addressData: {
        type: Object,
        required: true,
        default: {
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            zip: '',
        },
    },
})
// const emit = defineEmits()
</script>

<template>
    <section class="w-full">
        <div class="grid items-center w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <TextInput
                v-model="addressData.address_line_1"
                data-test="address-1"
                label="Street Address"
            />

            <TextInput
                v-model="addressData.city"
                data-test="address-city"
                label="City"
            />
        </div>
        <div class="grid items-center w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <SearchableSelect
                v-model="addressData.state"
                data-test="address-state"
                label="State"
                :options="states"
            />
            <TextInput
                v-model="addressData.zip"
                data-test="address-zip"
                label="Zip"
                max-length="5"
            />
        </div>
    </section>
</template>
