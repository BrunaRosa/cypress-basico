
describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('././cypress-basico-v2/src/index.html')
      })

      it('Verifica o título da aplicação', function(){
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT' )
      })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = "Teste teste Teste teste Teste teste Teste teste Teste teste"

        cy.get('#firstName').should('be.visible').type('Bruna').should('have.value', 'Bruna')
        cy.get('#lastName').should('be.visible').type('Rosa').should('have.value', 'Rosa')
        cy.get('#email').should('be.visible').type('brunarosinha@gmail.com').should('have.value', 'brunarosinha@gmail.com')
        cy.get('#open-text-area').should('be.visible').type(longText, { delay: 0}).should('have.value', longText)
        cy.contains('.button', 'Enviar').click()
        cy.get('.success').should('be.visible','Mensagem enviada com sucesso.')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').should('be.visible').type('Bruna').should('have.value', 'Bruna')
        cy.get('#lastName').should('be.visible').type('Rosa').should('have.value', 'Rosa')
        cy.get('#email').should('be.visible').type('brunarosinha').should('have.value', 'brunarosinha')
        cy.get('#open-text-area').should('be.visible').type('Teste automatizado').should('have.value', 'Teste automatizado')
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
    })

    it('Valida se o campo de telefone aceita somente números', function() {
        cy.reload()
        cy.get('#firstName').should('be.visible').type('Bruna').should('have.value', 'Bruna')
        cy.get('#lastName').should('be.visible').type('Rosa').should('have.value', 'Rosa')
        cy.get('#email').should('be.visible').type('brunarosinha@gmail.com').should('have.value', 'brunarosinha@gmail.com')
        cy.get('#phone').should('be.visible').type('aaaaaaaaaaa').should('be.empty')
        cy.get('#phone').should('be.visible').type('aaaaaaaaaaa').should('have.value', '')
        cy.get('#open-text-area').should('be.visible').type('Teste automatizado').should('have.value', 'Teste automatizado')
        cy.contains('.button', 'Enviar').click()
        cy.get('.success').should('be.visible','Mensagem enviada com sucesso.')
    })
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').should('be.visible').type('Bruna').should('have.value', 'Bruna')
        cy.get('#lastName').should('be.visible').type('Rosa').should('have.value', 'Rosa')
        cy.get('#email').should('be.visible').type('brunarosinha@gmail.com').should('have.value', 'brunarosinha@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').should('be.visible').type('Teste automatizado').should('have.value', 'Teste automatizado')
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
    })

    it('Preenche e limpa os campos nomes, sobre nome, email e telefone', function() {
        cy.get('#firstName').should('be.visible').type('Bruna').should('have.value', 'Bruna').clear().should('have.value', '')
        cy.get('#lastName').should('be.visible').type('Rosa').should('have.value', 'Rosa').clear().should('have.value', '')
        cy.get('#email').should('be.visible').type('brunarosinha@gmail.com').should('have.value', 'brunarosinha@gmail.com').clear().should('have.value', '')
        cy.get('#phone').should('be.visible').type('9457867894').clear().should('have.value', '')
        cy.get('#open-text-area').should('be.visible').type('Teste automatizado').should('have.value', 'Teste automatizado')
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible','Valide os campos obrigatórios!')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
    })
    
    it('seleciona um produto (YouTube) por seu texto', () => {
        const product = "youtube"
        cy.get('#product').select(product).should('have.value', product)
    })
    
    it('seleciona um produto (Mentoria) por seu texto', () => {
        const product = "mentoria"
        cy.get('#product').select(product).should('have.value', product)
    })

    it('seleciona um produto (Blog) por seu texto', () => {
        const product = "blog"
        cy.get('#product').select(product).should('have.value', product)
    })

    it('seleciona um produto (Blog) por seu indice', () => {
        const product = "blog"
        cy.get('#product').select(1).should('have.value', product )
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check().last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        
        cy.get('input[type="file"]')
        .selectFile('@sampleFile', { action: 'drag-drop'})
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

  })