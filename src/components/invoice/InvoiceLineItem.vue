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
    itemIndex: {
        type: Number,
    },
})
const options = [
    { label: 'Hours', value: 'Hours' },
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
    <div
        class="relative grid w-full grid-cols-4 grid-rows-2 gap-3 md:grid-rows-1 md:grid-cols-6"
    >
        <TextInput
            v-model="lineItem.description"
            :data-test="'item-description-' + itemIndex"
            placeholder="Description of item"
            container-class="col-span-3 md:col-span-2"
        />
        <TextInput
            v-model.float="lineItem.quantity"
            :data-test="`item-quantity-${itemIndex}`"
            placeholder="Qty"
        />
        <BasicSelect
            v-model="lineItem.unitType"
            :data-test="`item-unit-${itemIndex}`"
            :options="options"
            placeholder="Unit"
            container-class="w-20"
        />
        <TextInput
            v-model.float="lineItem.unitPrice"
            :data-test="`item-price-${itemIndex}`"
            placeholder="Price"
            container-class="w-20"
        />
        <div
            class="relative w-full col-span-2 gap-2 md:col-span-1 flex-ic-jend"
        >
            <p class="text-lg">{{ handleFormat(lineItemTotal, 'currency') }}</p>
            <TrashIcon
                class="right-0 gap-1 text-sm bg-gray-200 border border-gray-800 rounded-lg primary-text size-7"
                @click="emit('delete-line-item', lineItem.id)"
            />
        </div>
    </div>
</template>
