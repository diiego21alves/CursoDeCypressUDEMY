

// //convertendo uma data para padrão BR + trazendo os 10 primeiros digitos + convertendo oq for (-) para (/)
// var data = faker.date.between("1979-01-01", "2003-01-01").toISOString().substr(0, 10).split('-').reverse().join('/');

// // como executar uma API
// cy.request({
//     method: "POST",
//     url: "https://barrigarest.wcaquino.me/signin",
//     body: {
//         email: "diiego21alves@gmail.com",
//         redirecionar: false,
//         senha: "SENHA!"
//     }

// //CAPTURANDO A RESPOSTA DA API    
// }).then((response) => {
//     //VALIDANDO QUE A API FUNCIONOU
//     expect(response.status).to.eq(200)

//     //PEGANDO UM VALOR DA RESPOSTA DA API
//     let token = response.body.token

//     cy.inserirContaApi(token).then((response) => {

//         //VERIFICANDO SE O POST CRIOU CORRETAMENTE SEMPRE DEVE SER IGUAL 201
//         expect(response.status).to.eq(201)
//         let id = response.body.id
//         cy.inserirTransacaoApi(token, id).then((response) => {
//         expect(response.status).to.eq(201)
//         })
//     })
// })

// // usando o PARENT para ir ao elemento PAI do elemento selecionado pelo cy.get 
// cy.get(loc.CONTAS.FN_BTN_ALTERAR).contains('Conta alterada DIIEGO').parent().then(() => {
//     cy.get("span").should("contain", "Desc")

//     O que é GET e POST?
// Tanto GET como POST na verdade são métodos HTTP. Eles indicam para o servidor qual a ação que o cliente deseja realizar.
//  Quando realizamos uma requisição obrigatoriamente precisamos informar um método.

// GET – é usado quando o cliente deseja obter recursos do servidor
// POST – é usado quando o cliente deseja enviar dados para processamento ao servidor, como os dados de um formulário, por exemplo.
// Existem outros métodos HTTP. Os dois métodos citados acima são os mais usados, principalmente em aplicações web.
// Quando o usuário digita um endereço e aperta enter na barra de endereço do navegador, ele realiza uma requisição do tipo GET.
// Já quando preenchemos um formulário e clicamos em enviar geralmente o método usado é o POST.


// O que é 200, 404, 301 e outros números?

// 1xx – Informativos
// 2xx – Indicativos de sucesso
// 3xx – Redirecionamentos
// 4xx – Erros do cliente na hora de fazer a solicitação
// 5xx – Erros no lado do servidor
// Dentro de cada centena temos os códigos específicos, por exemplo:

// 200 - Tudo ocorreu corretamente
// 301 – Indica redirecionamento permanente
// 401 – Não autorizado
// 404 – O recurso solicitado não foi encontrado no servidor