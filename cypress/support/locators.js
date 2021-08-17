const locators = {
    LOGIN: {
        USER: "[data-test=email]",
        PASSWORD: "[data-test=passwd]",
        BTN_LOGIN: ".btn"
    },
    MENU: {
        HOME: "[data-test=menu-home]",
        SETTINGS: "[data-test=menu-settings]",
        CONTAS: "[href='/contas']",
        RESET: "[href='/reset']",
        MOVIMENTACAO: "[data-test=menu-movimentacao]",
        EXTRATO: "[data-test=menu-extrato]"
    },
    CONTAS: {
        NOME: "[data-test=nome]",
        BTN_SALVAR: ".btn",
        FN_BTN_ALTERAR: (nome) =>  `td:contains("${nome}")`,
    },
    MOVIMENTACAO: {
        DESCRICAO: "[data-test=descricao]",
        VALOR: "[data-test=valor]",
        INTERESSADO: "[data-test=envolvido]",
        CONTA: "[data-test=conta]",
        STATUS: "[data-test=status]",
        BTN_SALVAR: ".btn-primary"
    },
    EXTRATO: {
        LINHAS: ".list-group > li",
        LN_MOV: ".justify-content-between",
        DEL_MOV: ".far.fa-trash-alt",
        FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${value}')]`,
        FN_XP_REMOVER_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_ALTERAR_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='fas fa-edit']`,
        FN_XP_LINHA: desc => `//span[contains(., '${desc}')]/../../../..`
        
    },
    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]`,
        FN_SALDO_CONTA: () => `tr`  

    },
    MENSAGENS: {
        WELCOME: ".toast-message",
        SUCCESS: ".toast-success",
        CLOSE: ".toast-close-button"
        
    },
    
}

export default locators;