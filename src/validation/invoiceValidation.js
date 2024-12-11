import { required, email, minLength, helpers } from '@vuelidate/validators'

const checkLineItems = (value) => {
    if (value.length === 0) {
        return 'At least one line item is required'
    }
}

export const invoiceRules = {
    client: {
        required: helpers.withMessage('A client is required', required),
    },
    invoiceDate: {
        required: helpers.withMessage('An invoice date is required', required),
    },
    dueDate: {
        required: helpers.withMessage('A due date is required', required),
    },
    lineItems: {
        checkLineItems: helpers.withMessage(
            'At least one line item is required',
            checkLineItems
        ),
    },
}
