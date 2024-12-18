<script setup>
import { ref, watch } from 'vue'
import { getStyles } from '@/composables/getStyles'
// Components
// Utils

const props = defineProps({
    modelValue: {
        type: [Boolean, Number],
        default: 0,
    },
    label: {
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

    disabled: {
        type: Boolean,
        default: false,
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

const inputValue = ref(Boolean(props.modelValue))

const checkbox = ref(null)

const handleInput = (e) => {
    inputValue.value = e.target.checked
    emit('update:modelValue', inputValue.value ? 1 : 0)
}

watch(
    () => props.modelValue,
    (newValue) => {
        inputValue.value = Boolean(newValue)
    }
)
</script>

<template>
    <div class="flex-col-is-js">
        <label v-if="label" :for="inputName" :class="classes.labelClass">{{
            label
        }}</label>
        <input
            :name="inputName"
            :checked="inputValue"
            type="checkbox"
            :class="classes.inputClass"
            :disabled="disabled"
            @input="($event) => handleInput($event, format)"
            @change="($event) => handleInput($event, format)"
        />
        <p
            v-if="error && errorMessages.length"
            class="mt-1 text-xs text-red-700 dark:text-red-400"
        >
            {{ errorMessages[0].$message }}
        </p>
    </div>
</template>
