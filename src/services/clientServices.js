import axiosAuth from '@/utils/axiosAuth'
// Pinia
import { storeToRefs } from 'pinia'
import { useRuntimeStore } from '@/stores/runtimeStore'
import { useAccountStore } from '@/stores/accountStore'
// Utils
import { useNotify } from '@/utils/notificationUtils'

export const createNewClient = async (newClient) => {
    const { currentAccount } = storeToRefs(useAccountStore())
    const { apiRoot } = storeToRefs(useRuntimeStore())
    newClient.accountId = currentAccount.value.id
    let result
    try {
        const res = await axiosAuth.post(
            `${apiRoot.value}/profile/create-client`,
            newClient
        )
        useNotify(
            'success',
            'Profile Created',
            'The profile was created successfully',
            3000
        )
        result = res.data
    } catch (err) {
        useNotify('error', 'Error', err.response.data, 3000)
    }
    console.log(result)
    return result
}
