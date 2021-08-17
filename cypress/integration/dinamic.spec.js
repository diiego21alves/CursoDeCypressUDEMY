// <reference types="cypress" />

describe("Dinamic test", () => {
    beforeEach(() => {
        cy.visit("https://www.wcaquino.me/cypress/componentes.html")
    })

    const foods = ["Carne", "Frango", "Pizza", "Vegetariano"]
    foods.forEach((food) =>{
        it(`Cadastrado com a comida ${food}`, () => {
            cy.get("#formNome").type("Usuario")
            cy.get("#formSobrenome").type("Qualquer")
            cy.get(`[name=formSexo][value=F]`).click()
            cy.get('label').contains(`${food}`).click()
            cy.get("#formEscolaridade").select("Doutorado")
            cy.get("#formEsportes").select("Corrida")
            cy.get("#formCadastrar").click()
            cy.get("#resultado > :nth-child(1)").should("contain", "Cadastrado!")
        })
        
    })

    it.only("Deve selecionar todos usando o each", () => {
        cy.get("#formNome").type("Usuario")
        cy.get("#formSobrenome").type("Qualquer")
        cy.get(`[name=formSexo][value=F]`).click()

        cy.get("[name=formComidaFavorita]").each($el => {
            //$el.click()
            if ($el.val() != "vegetariano")
                cy.wrap($el).click()
        })

        cy.get("#formEscolaridade").select("Doutorado")
        cy.get("#formEsportes").select("Corrida")
        cy.get("#formCadastrar").click()
        cy.get("#resultado > :nth-child(1)").should("contain", "Cadastrado!")
        // cy.clickAlert("#formCadastrar", "Tem certeza que vc eh vegetariano?")
    })
    
})