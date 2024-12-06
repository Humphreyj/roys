<script setup>
import { ref, watch, computed, watchEffect } from 'vue'
import { OnClickOutside } from '@vueuse/components'
// Components
import SvgComponent from '@/components/UI/SvgComponent.vue'
import { getStyles } from '@/composables/getStyles'

import selectCaret from '@/assets/SelectCaret.vue'

const props = defineProps({
    modelValue: [String, Object, Boolean],
    options: {
        type: Array,
        required: true,
    },
    cleared: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    error: {
        type: Boolean,
    },
    errorMessages: {
        type: Array,
        default: () => [],
    },
    placeholder: String,
    containerClass: String,
    inputClass: String,
    labelClass: String,
    optionsClass: String,
    optionClass: String,
    targetAttr: {
        type: String,
        default: 'value',
    },
    targetType: {
        type: String,
    },
})

const emit = defineEmits(['update:modelValue', 'value', 'resetCleared'])

const selectedValue = ref(props.modelValue)
const showOptions = ref(false)

watch(
    () => props.cleared,
    (newVal) => {
        if (newVal === true) {
            selectedValue.value = null
        }
    }
)

const toggleOptions = () => {
    showOptions.value = !showOptions.value
}

const setSelected = (value) => {
    if (props.targetType === 'object') {
        selectedValue.value = value[props.targetAttr]
        emit('update:modelValue', value)
    } else {
        selectedValue.value = value.label
        emit('update:modelValue', value[props.targetAttr])
    }
    showOptions.value = false
    console.log('selectedValue', selectedValue.value)
}

const messages = computed(() => {
    if (props.errorMessages) {
        return props.errorMessages
    }
    return []
})
watchEffect(() => {
    let found = props.options.find(
        (option) =>
            option[props.targetAttr] === props.modelValue[props.targetAttr]
    )
    if (found) {
        if (props.targetType === 'object') {
        }
        selectedValue.value = found[props.targetAttr]
    }
})

const classes = ref(getStyles(props, 'textInput'))
</script>

<template>
    <section :class="classes.containerClass">
        <label
            v-if="label"
            ref="select-label"
            data-test="select-label"
            :class="classes.labelClass"
            >{{ label }}</label
        >
        <OnClickOutside class="relative w-full" @trigger="showOptions = false">
            <input
                ref="select-input"
                v-bind="$attrs"
                v-model="selectedValue"
                :class="classes.inputClass"
                type="text"
                :placeholder="placeholder"
                data-test="select-input"
                tabindex="0"
                @keydown.enter.prevent="toggleOptions"
                @click="toggleOptions"
            />

            <SvgComponent
                :svg="selectCaret"
                class="absolute mt-2 right-2 top-1 dark:text-white"
                size="14"
            />
            <span v-if="selectedValue">{{ selectedValue.label }}</span>

            <div v-show="`${error ? 'inline-flex' : 'invisible'}`" class="mt-1">
                <div
                    v-for="({ $message }, i) in messages"
                    :key="i"
                    class="text-xs text-red-700 dark:text-red-400"
                >
                    {{ $message }}
                </div>
            </div>

            <div
                v-if="showOptions"
                data-test="select-options"
                :class="classes.optionsClass"
            >
                <div
                    v-for="(option, i) in options"
                    :key="option[`${targetAttr}`]"
                    tabindex="0"
                    :data-test="`select-option-${i}`"
                    :class="classes.optionClass"
                    :value="option[`${targetAttr}`]"
                    @click="setSelected(option)"
                    @keydown.enter.prevent="setSelected(option)"
                >
                    {{ option.label ?? option[`${targetAttr}`] }}
                </div>
            </div>
        </OnClickOutside>
    </section>
</template>
