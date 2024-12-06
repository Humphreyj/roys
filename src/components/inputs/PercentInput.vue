<script setup>
import { ref, watch, onMounted } from 'vue'
import { getStyles } from '@/composables/getStyles'
// Components
// Utils
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
    disabled: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['update:modelValue'])
const classes = ref(getStyles(props, 'textInput'))

const inputValue = ref(props.modelValue)

const handleInput = (e, type) => {
    inputValue.value = e.target.value

    let result = handleFormat(inputValue.value, props.format)

    emit('update:modelValue', result)
}

watch(inputValue, (newVal) => {
    if (newVal === props.modelValue) return
    inputValue.value = newVal
    emit('update:modelValue', handleFormat(inputValue.value, props.format))
})

// watchEffect(() => {
//     inputValue.value = handleFormat(props.modelValue, props.format)
//     emit('update:modelValue', inputValue.value)
// })

onMounted(() => {
    inputValue.value = props.modelValue * 100
})
</script>

<template>
    <div :class="classes.containerClass">
        <label v-if="label" :for="inputName" :class="classes.labelClass">{{
            label
        }}</label>
        <input
            :name="inputName"
            :value="inputValue"
            :placeholder="placeholder"
            :type="type"
            :maxlength="maxLength"
            :class="classes.inputClass"
            :disabled="disabled"
            @input="($event) => handleInput($event, format)"
        />
    </div>
</template>
