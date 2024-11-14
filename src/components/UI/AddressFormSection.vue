<script setup>
// Components
import BasicSelect from '../inputs/BasicSelect.vue'
import TextInput from '@/components/inputs/TextInput.vue'
// Data
// Data
import states from '@/constants/states'
const props = defineProps({
    addressData: {
        type: Object,
        required: true,
    },
})
// const emit = defineEmits()
</script>

<template>
    <section class="w-full">
        <div class="grid items-center w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <TextInput
                v-model="addressData.address_line_1"
                data-test="address_line_1"
                label="Street Address"
            />

            <TextInput
                v-model="addressData.city"
                data-test="address_city"
                label="City"
            />
        </div>
        <div class="grid items-center w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <BasicSelect
                v-model="addressData.state"
                data-test="address_state"
                label="State"
                :options="states"
            />
            <TextInput
                v-model="addressData.zip"
                data-test="address_zip"
                label="Zip"
                max-length="5"
            />
        </div>
    </section>
</template>
