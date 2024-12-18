import { required, email, minLength, helpers } from '@vuelidate/validators'

export const accountRules = {
    companyName: {
        required: helpers.withMessage('A company name is required', required),
        regex: helpers.withMessage(
            'Value must be alphabetical',
            helpers.regex(/^[a-zA-Z\s'-]+$/)
        ),
    },
    companyPhone: {
        required: helpers.withMessage('Phone number is required', required),
        regex: helpers.withMessage(
            'Phone number must be in ###-###-#### format',
            helpers.regex(/^(\d{3})[-](\d{3})[-](\d{4})(?:x(\d+))?$/i)
        ),
    },
    companyEmail: {
        required: helpers.withMessage('An valid email is required', required),
        email,
        minLength: minLength(5),
    },
}
