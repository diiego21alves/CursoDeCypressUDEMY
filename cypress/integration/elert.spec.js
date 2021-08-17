// <reference types="cypress" />

describe("Work with basic elements", () => {
    before(() => {
        cy.visit("https://www.wcaquino.me/cypress/componentes.html")
    })

    beforeEach(() => {
        cy.reload()
    })

    it.only("Alert", () => {
        // cy.get("#alert").click()
        // cy.on("window:alert", msg => {
        //     console.log(msg)
        //     expect(msg).to.be.equal("Alert Simples")
        // })
        cy.clickAlert("#alert", "Alert Simples")
    })

    it("Alert com mock", () => {
        const stub = cy.stub().as("alerta")
        cy.on("window:alert", stub)
        cy.get("#alert").click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith("Alert Simples")
        })
    })

    it("Confirm", () => {
        cy.get(locator).click()
        cy.on("window:confirm", msg => {
            expect(msg).to.be.equal("Confirm Simples")
        })
        cy.on("window:alert", msg => {
            expect(msg).to.be.equal("Confirmado")
        })
        cy.get("#confirm").click()
    })

    it("Dent", () => {
        cy.on("window:confirm", msg => {
            expect(msg).to.be.equal("Confirm Simples")
            return false
        })
        cy.on("window:alert", msg => {
            expect(msg).to.be.equal("Negado")
        })
        cy.get("#confirm").click()
    })

    it("Prompt", () => {
        cy.window().then(win => {
            cy.stub(win, "prompt").returns("42")
        })
        cy.on("window:prompt", msg => {
            expect(msg).to.be.equal("Era 42?")
        })
        cy.on("window:alert", msg => {
            expect(msg).to.be.equal(":D")
        })
        cy.get("#prompt").click()

    })

    // it.only("Validando mensagens", () => {
    //     const stub = cy.stub().as("alerta")
    //     cy.on("window:alert", stub)
    //     cy.get("#formCadastrar").click()
    //         .then(() => expect(stub.getCall(0)).to.be.calledWith("Nome eh obrigatorio"))
        
    //     cy.get("#formNome").type("Diego")
    //     cy.get("#formCadastrar").click()
    //         .then(() => expect(stub.getCall(1)).to.be.calledWith("Sobrenome eh obrigatorio"))

    //     cy.get("[data-cy=dataSobrenome]").type("Alves")
    //     cy.get("#formCadastrar").click()
    //         .then(() => expect(stub.getCall(2)).to.be.calledWith("Sexo eh obrigatorio"))

    //     cy.get("#formSexoMasc").click()
    //     cy.get("#formComidaFrango").click()
    //     cy.get("#formComidaCarne").click()

    //     cy.get("[data-test=dataEscolaridade]")
    //         .select("2o grau completo")
    //         .should("have.value","2graucomp")

    //     cy.get("[data-testid=dataEsportes]")
    //         .select(["natacao", "Corrida", "futebol"])

    //     cy.get("#elementosForm\\:sugestoes")
    //         .clear()
    //         .type("ESTOU FAZENDO MEUS TESTES POR CONTA PRÓPRIA\n\n ❤🧡💛💚💙!", { delay:100})
            
    //     cy.get("#formCadastrar").click()
    // })

})