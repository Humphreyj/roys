<script setup>
import { ref, computed } from 'vue'
// Assets
import { TrashIcon } from '@heroicons/vue/24/outline'
// Components
import Button from '../UI/Button.vue'
import BasicSelect from '../inputs/BasicSelect.vue'
import TextInput from '@/components/inputs/TextInput.vue'
// Utils
import { handleFormat } from '@/utils/formatText'
const emit = defineEmits(['delete-line-item'])
const props = defineProps({
    lineItem: {
        type: Object,
    },
})
const options = [
    { label: 'Per Hour', value: 'Per Hour' },
    { label: 'Per Job', value: 'Per Job' },
    { label: 'Each', value: 'Each' },
]
const lineItem = ref(props.lineItem)
const lineItemTotal = computed(() => {
    let result = lineItem.value.quantity * lineItem.value.unitPrice
    lineItem.value.lineItemTotal = result
    return result
})
</script>

<template>
    <div class="grid w-full grid-cols-6 gap-3">
        <TextInput
            v-model="lineItem.description"
            placeholder="Description of item"
            container-class="col-span-2"
        />
        <TextInput v-model.float="lineItem.quantity" placeholder="Qty" />
        <BasicSelect
            v-model="lineItem.unitType"
            :options="options"
            placeholder="Unit"
        />
        <TextInput v-model.float="lineItem.unitPrice" placeholder="Price" />
        <div class="relative w-full flex-ic-js">
            <p class="text-lg">{{ handleFormat(lineItemTotal, 'currency') }}</p>
            <TrashIcon
                class="absolute right-0 p-1 text-sm bg-gray-200 border border-gray-800 rounded-lg primary-text size-7"
                @click="emit('delete-line-item', lineItem.id)"
            />
        </div>
    </div>
</template>
