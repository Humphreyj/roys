<script setup>
// Components
import CompanyDetailsCard from './CompanyDetailsCard.vue'
import SettingsForm from './SettingsForm.vue'
// Pinia
import { storeToRefs } from 'pinia'
import { useAccountStore } from '@/stores/accountStore'
// const props = defineProps({})
// const emit = defineEmits()

const { currentAccount, editingCurrentAccount } = storeToRefs(useAccountStore())
const toggleAccountEditing = () => {
    editingCurrentAccount.value = !editingCurrentAccount.value
}
</script>

<template>
    <section class="p-4">
        <div class="">
            <SettingsForm v-if="editingCurrentAccount" />
            <CompanyDetailsCard
                v-else
                :currentAccount="currentAccount"
                @toggle-editing="toggleAccountEditing"
            />
        </div>
    </section>
</template>
