describe('Account Flow', () => {
    it('should create an account', () => {
        cy.visit('/')
        cy.getElement('create-account').click()
        cy.getElement('first-name').type('John')
        cy.getElement('last-name').type('Doe')
        cy.getElement('address-1').type('123 Main St')
        cy.getElement('address-city').type('Springfield')
        cy.getElement('address-state').click()
        cy.contains('Arizona').click()
        cy.getElement('address-zip').type('62701')
        cy.getElement('user-email').type('johndoe@mail.com')
        cy.getElement('user-email').type('johndoe@mail.com')
        cy.getElement('user-phone').type('1234343434')

        cy.getElement('profile-submit').click()
    })
})
