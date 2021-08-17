// <reference types="cypress" />
const dayjs = require('dayjs')

describe("Should test at a functional level", () => {
    // let token
    const url = Cypress.config("baseUrl2")
    before(() => {
        cy.getToken("diiego21alves@gmail.com", "SENHA!")
            // .then(tkn => {
            //     token = tkn
            // })
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it("Should create an account", () => {
        cy.request({
            url: url + "/contas",
            method: "POST",
            // headers: { Authorization: `JWT ${token}` },
            body: {
                nome: "Conta via rest"
            }
        }).as("response")

        cy.get("@response").then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property("id")
            expect(res.body).to.have.property("nome", "Conta via rest")
        })


    })

    it("Should update an account", () => {
        cy.getContaByName("Conta para alterar")
            .then(contaId => {
                cy.request({
                    url: `${url}/contas/${contaId}`,
                    method: "PUT",
                    // headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: "conta alterada via rest"
                    }
                }).as("response")

            })

        cy.get("@response").its("status").should("be.equal", 200)
    })

    it("Should not create an account with same name", () => {
        cy.request({
            url: url + "/contas",
            method: "POST",
            // headers: { Authorization: `JWT ${token}` },
            body: {
                nome: "Conta mesmo nome"
            },
            failOnStatusCode: false
        }).as("response")

        cy.get("@response").then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal("Já existe uma conta com esse nome!")
        })

    })
    it("Should create a transaction", () => {
        cy.getContaByName("Conta para movimentacoes")
            .then(contaId => {
                cy.request({
                    method: "POST",
                    url: url + "/transacoes",
                    // headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: contaId,
                        data_pagamento: dayjs().format("DD/MM/YYYY"),
                        data_transacao: dayjs().format("DD/MM/YYYY"),
                        descricao: "desc",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123",
                    }

                }).as("response")
            })
        cy.get("@response").its("status").should("be.equal", 201)
        cy.get("@response").its("body.id").should("exist")
    })
    it("Should get balance", () => {
        cy.request({
            url: url + "/saldo",
            method: "GET",
            // headers: { Authorization: `JWT ${token}` },
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === "Conta para saldo") saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal("534.00")
        })
        cy.request({
            method: "GET",
            url: url + "/transacoes",
            headers: {
                // Authorization: `JWT ${token}`,
                qs: { descricao: "Movimentacoes 1, calculo saldo" }
            }
        }).then(res => {
            console.log(res)
            cy.request({
                url: `${url}/transacoes/${res.body[0].id}`,
                method: "PUT",
                // headers: { Authorization: `JWT ${token}` },
                body: {
                    conta_id: res.body[0].conta_id,
                    data_pagamento: dayjs(res.body[0].data_pagamento).format("DD/MM/YYYY"),
                    data_transacao: dayjs().format("DD/MM/YYYY"),
                    descricao: "desc",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "123",
                }
            }).its("status").should("be.equal", 200)

        })

        cy.request({
            url: url + "/saldo",
            method: "GET",
            // headers: { Authorization: `JWT ${token}` },
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === "Conta para saldo") saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal("534.00")
        })
    })

    it("Should remove a transaction", () => {
        cy.request({
            method: "GET",
            url: url + "/transacoes",
            headers: {
                // Authorization: `JWT ${token}`,
            },
            qs: { descricao: "Movimentacao para exclusao" }
        }).then(res => {
            cy.request({
                url: `${url}/transacoes/${res.body[0].id}`,
                method: "DELETE",
                // headers: { Authorization: `JWT ${token}` }
            }).its("status").should("be.equal", 204)
        })

    })
})