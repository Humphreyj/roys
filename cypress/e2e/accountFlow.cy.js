import { faker } from '@faker-js/faker'

describe('Account Flow', () => {
    it('should create an account', () => {
        const userFirstName = faker.person.firstName()
        const userEmail = faker.internet.email()
        const businessEmail = `business${userEmail}`
        const accountState = faker.location.state()
        const businessName = `${userFirstName}'s Business`
        cy.visit('/')
        cy.getElement('create-account').click()
        cy.getElement('first-name').type(userFirstName)
        cy.getElement('last-name').type(faker.person.lastName())
        cy.getElement('address-1').type(faker.location.streetAddress())
        cy.getElement('address-city').type(faker.location.city())
        cy.getElement('address-state').click()
        cy.contains(accountState).click()
        cy.getElement('address-zip').type(faker.location.zipCode())
        cy.getElement('user-email').type(userEmail)
        cy.getElement('user-phone').type(faker.phone.number())
        cy.getElement('profile-submit').click()

        cy.getElement('company-name').type(businessName)
        cy.getElement('company-phone').type(faker.phone.number())
        cy.getElement('company-email').type(businessEmail)
        cy.getElement('address-1').type(faker.location.streetAddress())
        cy.getElement('address-city').type(faker.location.city())
        cy.getElement('address-state').click()
        cy.contains(accountState).click()
        cy.getElement('address-zip').type(faker.location.zipCode())
        cy.getElement('save-settings').click()

        // create a fake profile
        cy.getElement('profiles-link').click()
        cy.getElement('create-profile').click()
        cy.createFakeProfile()
        cy.getElement('create-profile').click()
        cy.createFakeProfile()
        cy.getElement('create-profile').click()
        cy.createFakeProfile()
    })
})
