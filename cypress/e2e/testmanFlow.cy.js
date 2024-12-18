import { faker } from '@faker-js/faker'

describe('Set up testman profiles/invoices', () => {
    it('creates profiles and invoices for demo', () => {
        const newClients = [
            {
                first_name: 'John',
                last_name: 'Hammburger',
                email: 'john@hammburger.com',
                phone: '5555555555',
            },
            {
                first_name: 'Timothy',
                last_name: 'Elephant',
                email: 'timmy@elephant.com',
                phone: '8884449999',
            },
            {
                first_name: 'Terrance',
                last_name: 'Eggberterton',
                email: 'terry@heggberterton.com',
                phone: '8389489223',
            },
        ]

        let lineItems = [
            {
                description: faker.commerce.productName(),
                unitType: 'Hours',
                quantity: faker.number.int({ max: 10 }),
                unitPrice: faker.number.float({ max: 1000 }),
            },
            {
                description: faker.commerce.productName(),
                unitType: 'Each',
                quantity: faker.number.int({ max: 10 }),
                unitPrice: faker.number.float({ max: 1000 }),
            },
            {
                description: faker.commerce.productName(),
                unitType: 'Hours',
                quantity: faker.number.int({ max: 10 }),
                unitPrice: faker.number.float({ max: 1000 }),
            },
        ]

        cy.visit('/')

        cy.getElement('email').type('system@ezpdf.app')
        cy.getElement('password').type('p@55word!')
        // cy.getElement('user-phone').type(faker.phone.number())
        cy.getElement('login-button').click()

        // create a fake profile
        cy.getElement('profiles-link').click()
        cy.getElement('create-profile').click()
        cy.createProfile(newClients[0])
        cy.getElement('create-profile').click()
        cy.createProfile(newClients[1])
        cy.getElement('create-profile').click()
        cy.createProfile(newClients[2])

        cy.getElement('invoices-link').click()
        cy.getElement('create-invoice').click()
        cy.getElement('invoice-client').click()
        cy.contains('John Hammburger').click()
        cy.getElement('invoice-due-date').type('2025-01-15')
        lineItems.forEach((lineItem, i) => {
            cy.createInvoiceLineItem(lineItem, i)
            if (i < lineItems.length - 1) {
                cy.getElement('add-line-item').click()
            }
        })
        cy.getElement('invoice-comments').type(
            faker.lorem.lines({ min: 1, max: 3 })
        )
        cy.getElement('submit-invoice').click()

        cy.getElement('invoices-link').click()
        cy.getElement('create-invoice').click()
        cy.getElement('invoice-client').click()
        cy.contains('Timothy Elephant').click()
        cy.getElement('invoice-due-date').type('2025-01-15')
        lineItems.forEach((lineItem, i) => {
            cy.createInvoiceLineItem(lineItem, i)
            if (i < lineItems.length - 1) {
                cy.getElement('add-line-item').click()
            }
        })
        cy.getElement('invoice-comments').type(
            faker.lorem.lines({ min: 1, max: 3 })
        )
        cy.getElement('submit-invoice').click()

        cy.getElement('invoices-link').click()
        cy.getElement('create-invoice').click()
        cy.getElement('invoice-client').click()
        cy.contains('Terrance Eggberterton').click()
        cy.getElement('invoice-due-date').type('2025-01-15')
        lineItems.forEach((lineItem, i) => {
            cy.createInvoiceLineItem(lineItem, i)
            if (i < lineItems.length - 1) {
                cy.getElement('add-line-item').click()
            }
        })
        cy.getElement('invoice-comments').type(
            faker.lorem.lines({ min: 1, max: 3 })
        )
        cy.getElement('submit-invoice').click()
    })
})
