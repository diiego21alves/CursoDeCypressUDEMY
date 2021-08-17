// <reference types="cypress" />

import loc from "../../support/locators"
import "../../support/commandsContas"
import buildEnv from "../../support/buildEnv"

describe("Should test at a functional level", () => {
    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        buildEnv()
        cy.login("user", "senha errada")
        cy.get(loc.MENU.HOME).click()
        // cy.resetApp()
    })

    it("should test the responsiveness", () => {
        cy.get("[data-test=menu-home]").should("exist")
        .and("be.visible")
        cy.viewport(500, 700)
        cy.get("[data-test=menu-home]").should("exist")
        .and("be.not.visible")
        cy.viewport("iphone-5")
        cy.get("[data-test=menu-home]").should("exist")
        .and("be.not.visible")
        cy.viewport("ipad-2")
        cy.get("[data-test=menu-home]").should("exist")
        .and("be.visible")
    })

    it("Should create an account", () => {
        cy.route({
            method: "POST",
            url: "/contas",
            response: { id: 3, nome: "Conta de teste DIIEGO", visivel: true, usuario_id: 1 }
        }).as("saveConta")

        cy.acessarMenuConta()

        cy.route({
            method: "GET",
            url: "/contas",
            response: [
                { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
                { id: 2, nome: "Banco", visivel: true, usuario_id: 1 },
                { id: 3, nome: "Conta de teste DIIEGO", visivel: true, usuario_id: 1 },
            ]
        }).as("contasSave")


        cy.inserirConta("Conta de teste DIIEGO")
        cy.get(loc.MENSAGENS.WELCOME).should("contain", "Conta inserida com sucesso")
    })
    it("Should update an account", () => {
        cy.route({
            method: "PUT",
            url: "/contas/**",
            response: { id: 1, nome: "Conta alterada DIIEGO", visivel: true, usuario_id: 1 }
        })

        cy.acessarMenuConta()

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.FN_BTN_ALTERAR).contains("Carteira").parent().within(() => {
            cy.get("i").first().click()
        })
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type("Conta alterada DIIEGO")
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MENSAGENS.WELCOME).should("contain", "Conta atualizada com sucesso")
        // cy.get(loc.MENSAGENS.CLOSE).click()
        // cy.get(loc.MENU.SETTINGS).click()
        // cy.get(loc.MENU.RESET).click()
    })
    it("Should not create an account with same name", () => {
        cy.route({
            method: "POST",
            url: "/contas",
            response: { "error": "Já existe uma conta com esse nome!" },
            status: 400
        }).as("saveContaMesmoNome")

        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type("Conta mesmo nome")
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MENSAGENS.WELCOME).should("contain", "code 400")


    })
    it("Should create a transaction", () => {
        cy.route({
            method: "POST",
            url: "/transacoes",
            response: { "id": 674556, "descricao": "afadasd", "envolvido": "fafdsafds", "observacao": null, "tipo": "REC", "data_transacao": "2021-08-04T03:00:00.000Z", "data_pagamento": "2021-08-04T03:00:00.000Z", "valor": "232.00", "status": false, "conta_id": 726860, "usuario_id": 22282, "transferencia_id": null, "parcelamento_id": null }
        })

        cy.route({
            method: "GET",
            url: "/extrato/**",
            response: "fixture:movimentacaoSalva"
        })

        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type("Desc")
        cy.get(loc.MOVIMENTACAO.VALOR).type("123")
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type("Inter")
        cy.get(loc.MOVIMENTACAO.CONTA).select("Banco")
        cy.get(loc.MOVIMENTACAO.STATUS).click()


        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MENSAGENS.WELCOME).should("contain", "sucesso")


        cy.get(loc.EXTRATO.LINHAS).should("have.length", 8)
        cy.get(loc.CONTAS.FN_BTN_ALTERAR).contains("Conta para extrato").parent().then(() => {
            cy.get("span").should("contain", "Desc")
        })
        cy.get(loc.CONTAS.FN_BTN_ALTERAR).contains("Conta para extrato").parent().then(() => {
            cy.contains("123")
        })

    })

    it("Should get balance", () => {
        cy.route({
            method: "GET",
            url: "/transacoes/**",
            response: { 
                "conta": "Conta para saldo", 
                "id": 674534, 
                "descricao": "Movimentacao 1, calculo saldo", 
                "envolvido": "CCC", 
                "observacao": null, 
                "tipo": "REC", 
                "data_transacao": "2021-08-04T03:00:00.000Z", 
                "data_pagamento": "2021-08-04T03:00:00.000Z", 
                "valor": "3500.00", 
                "status": false, 
                "conta_id": 726864, 
                "usuario_id": 22282, 
                "transferencia_id": null, 
                "parcelamento_id": null 
            },
        })

        cy.route({
            method: "PUT",
            url: "/transacoes/**",
            response: { 
                "conta": "Conta para saldo", 
                "id": 674534, 
                "descricao": "Movimentacao 1, calculo saldo", 
                "envolvido": "CCC", 
                "observacao": null, 
                "tipo": "REC", 
                "data_transacao": "2021-08-04T03:00:00.000Z", 
                "data_pagamento": "2021-08-04T03:00:00.000Z", 
                "valor": "3500.00", 
                "status": false, 
                "conta_id": 726864, 
                "usuario_id": 22282, 
                "transferencia_id": null, 
                "parcelamento_id": null 
            }
        })

        cy.get(loc.MENU.HOME).click()
        // cy.get(loc.SALDO.FN_XP_SALDO_CONTA("Carteira")).should("contain", "100,00")

        // cy.get(loc.MENU.EXTRATO).click()
        // cy.get(loc.EXTRATO.FN_XP_SALDO_CONTA("Movimentacao 1, calculo saldo")).click()
        // // cy.wait(1000)
        // cy.get(loc.MOVIMENTACAO.DESCRICAO).should("have.value", "Movimentacao 1, calculo saldo")
        // cy.get(loc.MOVIMENTACAO.STATUS).click()
        // cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        // cy.get(loc.MENSAGENS).should("contain", "sucesso")

        cy.route({
            method: "GET",
            url: "/saldo",
            response: [{
                conta_id: 999,
                conta: "Carteira",
                saldo: "4034.00"
            },
            {
                conta_id: 9909,
                conta: "Banco",
                saldo: "10000000.00"
            },
            ]
        }).as("saldoFinal")

        // cy.get(loc.MENU.HOME).click()
        // cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA("Carteira")).should("contain", "4.034,00")
    })

    it("Should remove a transaction", () => {
        cy.route({
            method: "DELETE",
            url: "/transacoes/**",
            response: {},
            status: 204
        }).as("del")
        cy.get(loc.MENU.EXTRATO).click()
        cy.get(loc.EXTRATO.LN_MOV).contains("Conta para alterar").parent().parent().parent().within(() => {
            cy.get(loc.EXTRATO.DEL_MOV).click()
        })


    })

    it("Should validate data send to create an account", () => {
        const reqStub = cy.stub()
        cy.route({
            method: "POST",
            url: "/contas",
            response: { id: 3, nome: "Conta de teste DIIEGO", visivel: true, usuario_id: 1 },
            // onRequest: req => {
            //     console.log(req)
            //     expect(reqStub.args[0][0].body.nome).to.be.empty
            //     expect(reqStub.args[0][0].headers).to.have.property("Authorization")
            // }
            onRequest: reqStub

        }).as("saveConta")

        cy.acessarMenuConta()

        cy.route({
            method: "GET",
            url: "/contas",
            response: [
                { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
                { id: 2, nome: "Banco", visivel: true, usuario_id: 1 },
                { id: 3, nome: "Conta de teste DIIEGO", visivel: true, usuario_id: 1 },
            ]
        }).as("contasSave")


        cy.inserirConta("{CONTROL}")
        // cy.wait("@saveConta").its("request.body.nome").should("not.be.empty")
        cy.wait("@saveConta").then(() => {
            console.log(reqStub.args[0][0])
                expect(reqStub.args[0][0].request.body.nome).to.be.empty
                expect(reqStub.args[0][0].request.headers).to.have.property("Authorization")
        })
        cy.get(loc.MENSAGENS.WELCOME).should("contain", "Conta inserida com sucesso")
    })

    it("Should test colors", () => {
        cy.route({
            method: "GET",
            url: "/extrato/**",
            response: [
            {"conta":"Conta para alterar","id":674556,"descricao":"Receita paga","envolvido":"fafdsafds","observacao":null,"tipo":"REC","data_transacao":"2021-08-04T03:00:00.000Z","data_pagamento":"2021-08-04T03:00:00.000Z","valor":"232.00","status": true,"conta_id":726860,"usuario_id":22282,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para movimentacoes","id":674532,"descricao":"Receita pendente","envolvido":"AAA","observacao":null,"tipo":"REC","data_transacao":"2021-08-04T03:00:00.000Z","data_pagamento":"2021-08-04T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":726862,"usuario_id":22282,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta com movimentacao","id":674533,"descricao":"Despesa paga","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-08-04T03:00:00.000Z","data_pagamento":"2021-08-04T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":726863,"usuario_id":22282,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":674534,"descricao":"Despesa pendente, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2021-08-04T03:00:00.000Z","data_pagamento":"2021-08-04T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":726864,"usuario_id":22282,"transferencia_id":null,"parcelamento_id":null},]
        }).as("extrato")

        cy.get(loc.MENU.EXTRATO).click()

        cy.wait("@extrato").then((response) => {
            expect(response.statusCode).not.to.be.eq(400)
        })
        cy.get("span").contains("Receita paga").parent().parent().parent().parent().should("have.class", "receitaPaga")
        cy.get("span").contains("Receita pendente").parent().parent().parent().parent().should("have.class", "receitaPendente")
        cy.get("span").contains("Despesa paga").parent().parent().parent().parent().should("have.class", "despesaPaga")
        cy.get("span").contains("Despesa pendente").parent().parent().parent().parent().should("have.class", "despesaPendente")

        // cy.xpath(loc.MENU.EXTRATO.FN_XP_LINHA("Receita paga")).should("have.class", "receitaPaga")
    })

    
})