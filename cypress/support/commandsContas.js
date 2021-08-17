import loc from "./locators"
const dayjs = require('dayjs')

Cypress.Commands.add("acessarMenuConta", () => {
    cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add("inserirConta" , (conta) => {
    cy.get(loc.CONTAS.NOME).type(conta, {delay: 20})
        cy.get(loc.CONTAS.BTN_SALVAR).click()
})

Cypress.Commands.add("inserirContaApi" , (token) => {
    cy.request({
        method: "POST",
        url: "https://barrigarest.wcaquino.me/contas",
        headers: { 'Authorization': 'JWT '+ token },
        body: {
            nome: "Conta alterada DIIEGO 1"
        }
    })
})

Cypress.Commands.add("inserirTransacaoApi", (token, id) => {
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/transacoes', // Url do endpoint da api a qual irei fazer o request
        headers: { 'Authorization': 'JWT '+ token },
        body: {
            conta_id: id,
            data_pagamento: dayjs().format("DD/MM/YYYY"),
            data_transacao: dayjs().format("DD/MM/YYYY"),
            descricao: "desc",
            envolvido: "inter",
            status: true,
            tipo: "REC",
            valor: "123"
        }
    })
})