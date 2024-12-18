import { required, email, minLength, helpers } from '@vuelidate/validators'

export const profileRules = {
    first_name: {
        required: helpers.withMessage('A first name is required', required),
        regex: helpers.withMessage(
            'Value must be alphabetical',
            helpers.regex(/^[a-zA-Z\s-]+$/)
        ),
    },
    last_name: {
        required: helpers.withMessage('A last name is required', required),
        regex: helpers.withMessage(
            'Value must be alphabetical',
            helpers.regex(/^[a-zA-Z\s-]+$/)
        ),
    },
    email: {
        required: helpers.withMessage('An valid email is required', required),
        email,
        minLength: minLength(5),
    },
    password: {
        required: helpers.withMessage('A password is required', required),
        minLength: helpers.withMessage(
            'Password must be at least 8 characters',
            minLength(8)
        ),
        containsNumberAndSpecialChar: helpers.withMessage(
            'Password must contain at least one number and one special character',
            (value) => /(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)
        ),
    },
}
export const newClientRules = {
    first_name: {
        required: helpers.withMessage('A first name is required', required),
        regex: helpers.withMessage(
            'Value must be alphabetical',
            helpers.regex(/^[a-zA-Z\s-]+$/)
        ),
    },
    last_name: {
        required: helpers.withMessage('A last name is required', required),
        regex: helpers.withMessage(
            'Value must be alphabetical',
            helpers.regex(/^[a-zA-Z\s-]+$/)
        ),
    },
    email: {
        required: helpers.withMessage('An valid email is required', required),
        email,
        minLength: minLength(5),
    },
    phone: {
        required: helpers.withMessage('Phone number is required', required),
        regex: helpers.withMessage(
            'Phone number must be in ###-###-#### format',
            helpers.regex(/^(\d{3})[-](\d{3})[-](\d{4})(?:x(\d+))?$/i)
        ),
    },
}
