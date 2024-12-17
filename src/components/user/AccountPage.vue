<script setup>
// Components
import CompanyDetailsCard from './CompanyDetailsCard.vue'
import SettingsForm from './SettingsForm.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/accountStore'
// const props = defineProps({})
// const emit = defineEmits()

const { currentAccount } = storeToRefs(useAccountStore())
</script>

<template>
    <div>
        <CompanyDetailsCard :currentAccount="currentAccount" />
        <SettingsForm />
    </div>
</template>
