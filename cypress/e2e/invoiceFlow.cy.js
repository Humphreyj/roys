import { faker } from '@faker-js/faker'

describe('Invoice Flow', () => {
    it('should create an invoice', () => {
        let lineItems = [
            {
                description: faker.commerce.productName(),
                unitType: 'hour',
                quantity: faker.number.int({ max: 10 }),
                unitPrice: faker.number.float({ max: 1000 }),
            },
            {
                description: faker.commerce.productName(),
                unitType: 'hour',
                quantity: faker.number.int({ max: 10 }),
                unitPrice: faker.number.float({ max: 1000 }),
            },
            {
                description: faker.commerce.productName(),
                unitType: 'hour',
                quantity: faker.number.int({ max: 10 }),
                unitPrice: faker.number.float({ max: 1000 }),
            },
        ]

        cy.visit('/')
        cy.getElement('email').type('businessadmin@mail.com')
        cy.getElement('login-button').click()
        cy.getElement('invoices-link').click()
        cy.getElement('create-invoice').click()
        cy.getElement('invoice-client').click()
        cy.contains('Joshua Humphrey').click()
        // cy.getElement('invoice-date').type('2024-12-12')
        cy.getElement('invoice-due-date').type('2024-12-19')
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
