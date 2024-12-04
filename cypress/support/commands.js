import { faker } from '@faker-js/faker'

Cypress.Commands.add('getElement', (key) => {
    cy.get(`[data-test=${key}]`)
})

Cypress.Commands.add('createProfile', (profile) => {
    cy.getElement('first-name').type(profile.first_name)
    cy.getElement('last-name').type(profile.last_name)
    cy.getElement('user-email').type(profile.email)
    cy.getElement('user-phone').type(profile.phone)
    cy.getElement('profile-submit').click()
})
Cypress.Commands.add('createFakeProfile', () => {
    cy.getElement('first-name').type(faker.person.firstName())
    cy.getElement('last-name').type(faker.person.lastName())

    cy.getElement('address-1').type(faker.location.streetAddress())
    cy.getElement('address-city').type(faker.location.city())
    cy.getElement('address-state').click()
    cy.contains(faker.location.state()).click()
    cy.getElement('address-zip').type(faker.location.zipCode())
    cy.getElement('user-email').type(faker.internet.email())
    cy.getElement('user-phone').type(faker.phone.number())

    cy.getElement('profile-submit').click()
})

Cypress.Commands.add('createInvoice', (invoice) => {
    cy.getElement('invoice-client').click()
    cy.contains(invoice.client).click()
    cy.getElement('invoice-date').type(invoice.invoiceDate)
    cy.getElement('invoice-due-date').type(invoice.dueDate)
    cy.getElement('invoice-submit').click()
})

Cypress.Commands.add('createInvoiceLineItem', (lineItem, index) => {
    // cy.getElement('add-line-item').click()
    cy.getElement(`item-description-${index}`).type(lineItem.description)

    cy.getElement(`item-unit-${index}`).type(lineItem.unitType)
    cy.getElement(`item-quantity-${index}`).type(lineItem.quantity)
    cy.getElement(`item-price-${index}`).type(lineItem.unitPrice)
})
