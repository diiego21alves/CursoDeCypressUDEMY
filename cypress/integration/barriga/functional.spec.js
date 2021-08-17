// <reference types="cypress" />

import loc from "../../support/locators"
import "../../support/commandsContas"

describe("Should test at a functional level", () => {
    before(() => {
        cy.login("diiego21alves@gmail.com", "SENHA!")
        cy.resetApp()
        // cy.get(loc.MENSAGENS.CLOSE).click()
    })
    it("Should create an account", () => {
        cy.acessarMenuConta()
        cy.wait(1000)
        // cy.get(loc.MENU.RESET).click()
        // cy.wait(1000)
        cy.inserirConta("Conta de teste DIIEGO")
        cy.get(loc.MENSAGENS.SUCCESS).should("contain", "Conta inserida com sucesso!")
        // cy.get(loc.MENSAGENS.CLOSE).click()
        // cy.get(loc.MENSAGENS.CLOSE).click()
    })
    it("Should update an account", () => {
        cy.acessarMenuConta()

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.FN_BTN_ALTERAR).contains('Conta de teste DIIEGO').parent().within(() => {
            cy.get("i").first().click()
        })
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type("Conta alterada DIIEGO")
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MENSAGENS.SUCCESS).should("contain", "Conta atualizada")
        // cy.get(loc.MENSAGENS.CLOSE).click()
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.RESET).click()
    })
    it("Should not create an account with same name", () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type("Conta alterada DIIEGO")
        cy.get(loc.CONTAS.BTN_SALVAR).click()


    })
    it("Should create a transaction", () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type("Desc")
        cy.get(loc.MOVIMENTACAO.VALOR).type("123")
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type("Inter")
        cy.get(loc.MOVIMENTACAO.CONTA).select("Conta para alterar")
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MENSAGENS.WELCOME).should("contain", "sucesso")

        cy.get(loc.EXTRATO.LINHAS).should("have.length", 7)
        cy.get(loc.CONTAS.FN_BTN_ALTERAR).contains('Conta para alterar').parent().then(() => {
            cy.get("span").should("contain", "Desc")
        })
        cy.get(loc.CONTAS.FN_BTN_ALTERAR).contains('Conta para alterar').parent().then(() => {
            cy.contains("123")
        })

    })



    it("Should get balance", () => {
        cy.get(loc.MENU.HOME).click()
        cy.get(loc.CONTAS.FN_BTN_ALTERAR).contains('Conta para alterar').parent().then(() => {
            cy.contains("123")
        })


    })

    it("Should remove a transaction", () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.get(loc.EXTRATO.LN_MOV).contains("Desc").parent().parent().parent().within(() => {
            cy.get(loc.EXTRATO.DEL_MOV).click()
        })


    })
})