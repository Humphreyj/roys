<script setup>
import { ref, watch, computed } from 'vue'
import { getStyles } from '@/composables/getStyles'
import { format, parse } from 'date-fns'

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
        default: 'yyyy-MM-dd', // Default to ISO format for native input compatibility
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
    error: {
        type: Boolean,
        default: false,
    },
    errorMessages: {
        type: Array,
        default: () => [],
    },
})
const emit = defineEmits(['update:modelValue'])
const classes = ref(getStyles(props, 'textInput'))
const inputDate = ref(props.modelValue)

const formattedDate = computed(() => {
    if (!inputDate.value) return ''
    const date = new Date(inputDate.value)
    return isNaN(date.getTime()) ? '' : format(date, props.format)
})

const onInput = (event) => {
    const value = event.target.value
    let parsedDate
    // Try parsing the input using the specified format and fallback formats
    if (props.format === 'yyyy-MM-dd') {
        parsedDate = parse(value, 'yyyy-MM-dd', new Date())
    } else {
        parsedDate = parse(value, 'MM/dd/yyyy', new Date())
    }

    if (!isNaN(parsedDate.getTime())) {
        inputDate.value = parsedDate.toISOString()
        emit('update:modelValue', inputDate.value)
    } else {
        inputDate.value = ''
        emit('update:modelValue', '')
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
        <label v-if="label" :for="inputName" :class="classes.labelClass">
            {{ label }}
        </label>
        <input
            :name="inputName"
            :value="formattedDate"
            :placeholder="placeholder"
            type="date"
            :maxlength="maxLength"
            :class="classes.inputClass"
            @input="onInput"
        />
        <p
            v-if="error && errorMessages.length"
            class="absolute bottom-0 text-xs text-red-700 translate-y-5 dark:text-red-400"
        >
            {{ errorMessages[0].$message }}
        </p>
    </div>
</template>
