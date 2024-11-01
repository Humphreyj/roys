<script setup>
import { ref, computed } from 'vue'
// Components
import Button from '../UI/Button.vue'
import TextInput from '@/components/inputs/TextInput.vue'
// Utils
import { handleFormat } from '@/utils/formatText'
// const emit = defineEmits()
const props = defineProps({
    lineItem: {
        type: Object,
    },
})
const lineItem = ref(props.lineItem)
const lineItemTotal = computed(() => {
    let result = lineItem.value.quantity * lineItem.value.unitPrice
    lineItem.value.lineItemTotal = result
    return result
})
</script>

<template>
    <div class="grid w-full grid-cols-5 gap-3">
        <TextInput
            v-model="lineItem.description"
            placeholder="Description of item"
            container-class="col-span-2"
        />
        <TextInput v-model="lineItem.quantity" placeholder="Qty" />
        <TextInput v-model="lineItem.unitPrice" placeholder="Price" />
        <div class="relative w-full flex-ic-js">
            <p class="text-lg">{{ handleFormat(lineItemTotal, 'currency') }}</p>
            <Button
                text="X"
                button-class="absolute right-0 text-sm text-black bg-gray-300"
            />
        </div>
    </div>
</template>
