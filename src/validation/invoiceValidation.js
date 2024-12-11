import { required, email, minLength, helpers } from '@vuelidate/validators'

const checkLineItems = (value) => {
    for (const item of value) {
        if (
            !item.description ||
            !item.quantity ||
            !item.unitType ||
            !item.unitPrice
        ) {
            return false
        }
    }
    return true
}

const checkClient = (value) => {
    if (!value) {
        return false
    }

    return true
}

export const invoiceRules = {
    client: {
        required: helpers.withMessage('A client is required', checkClient),
    },
    invoiceDate: {
        required: helpers.withMessage('An invoice date is required', required),
    },
    dueDate: {
        required: helpers.withMessage('A due date is required', required),
    },
    lineItems: {
        checkLineItems: helpers.withMessage(
            'At least one line item is required and each must have a description, quantity, and unit price',
            checkLineItems
        ),
    },
}
