Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').should('be.visible').type('Bruna').should('have.value', 'Bruna')
    cy.get('#lastName').should('be.visible').type('Rosa').should('have.value', 'Rosa')
    cy.get('#email').should('be.visible').type('brunarosinha@gmail.com').should('have.value', 'brunarosinha@gmail.com')
    cy.get('#open-text-area').should('be.visible').type('Teste automatizado').should('have.value', 'Teste automatizado')
    cy.get('.button').click()
    cy.get('.success').should('be.visible','Mensagem enviada com sucesso.')
  })
