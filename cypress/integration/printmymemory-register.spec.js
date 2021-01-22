const faker = require('faker');

describe('PrintMyMemory', function() {
    it("Register", function() {
        // visits page
        cy.visit("https://printmymemory.com/register")

        // takes action like filling up the form
        let firstName = faker.name.firstName();
        let lastName = faker.name.lastName();
        let email = faker.internet.email();
        let number = faker.phone.phoneNumber();

        cy.get("input#usrFirstName").type(firstName);
        cy.get("input#usrLastName").type(lastName);
        cy.get("input#usrEmail").type(email);
        cy.get("input#usrMobileNo").type(number);

        // cy.get("button#btnRegisterUser").click();

        // Assert - make an assertion
        cy.url().should('include', '/userWelcome')
          
    })
})
