<script setup>
import { ref, watch, computed } from 'vue'
import { getStyles } from '@/composables/getStyles'
// Components
// Utils
import { format } from 'date-fns'
import { handleFormat } from '@/utils/formatText'

const props = defineProps({
    modelValue: {
        type: [String, Date, Number],
        default: '',
    },
    label: {
        type: String,
    },
    placeholder: {
        type: String,
    },
    format: {
        type: String,
    },
    maxLength: {
        type: String,
    },
    containerClass: {
        type: String,
        default: '',
    },
    labelClass: {
        type: String,
        default: '',
    },
    inputClass: {
        type: String,
        default: '',
    },
    inputName: {
        type: String,
        default: 'default-input',
    },
    type: {
        type: String,
        default: 'text',
    },
})
const emit = defineEmits(['update:modelValue'])
const classes = ref(getStyles(props, 'textInput'))
const inputDate = ref(props.modelValue)

const formattedDate = computed(() => {
    // return inputDate.value ? handleFormat(inputDate.value, 'date') : ''
    return inputDate.value
        ? format(new Date(inputDate.value), 'yyyy-MM-dd')
        : ''
})

const onInput = (event) => {
    if (inputDate.value) {
        const [year, month, day] = inputDate.value.split('-')
        const utcDate = new Date(Date.UTC(year, month - 1, day))
        inputDate.value = utcDate.toISOString().split('T')[0]
        emit('update:modelValue', utcDate.toISOString().split('T')[0])
    }
}

watch(
    () => props.modelValue,
    (newValue) => {
        inputDate.value = newValue
    }
)
</script>

<template>
    <div :class="classes.containerClass">
        <label v-if="label" :for="inputName" :class="classes.labelClass">{{
            label
        }}</label>
        <input
            :name="inputName"
            :value="formattedDate"
            :placeholder="placeholder"
            type="date"
            :maxlength="maxLength"
            :class="classes.inputClass"
            @input="onInput"
        />
    </div>
</template>
