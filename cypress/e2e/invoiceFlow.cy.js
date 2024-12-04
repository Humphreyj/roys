import { faker } from '@faker-js/faker'

describe('Invoice Flow', () => {
    it('should create an invoice', () => {
        cy.visit('/')
        cy.getElement('email').type('business@mail.com')
        cy.getElement('login-button').click()
        cy.getElement('invoices-link').click()
        cy.getElement('create-invoice').click()
        cy.getElement('invoice-client').click()
        cy.contains('Kevin Dunkus').click()
    })
})
