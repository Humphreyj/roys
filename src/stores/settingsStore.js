import { ref } from 'vue'
import { defineStore } from 'pinia'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from './runtimeStore'
import axios from 'axios'

export const useSettingsStore = defineStore('settingsStore', () => {
    const { apiRoot } = storeToRefs(useRuntimeStore())

    const actions = {}
    const values = {}
    return { ...actions, ...values }
})
