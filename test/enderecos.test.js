//const pactum = require('pactum');
const { spec, response } = require('pactum');
require('dotenv').config();
//const { faker} = require('pactum');
const faker = require('faker');
let randomNumber = faker.random.number(); // Gera um número inteiro aleatório entre 0 e 100
let streetName = `${faker.random.word()}`; // Gera um nome aleatório

let UrlBase = process.env.BaseUrl
let token = process.env.tokenStrapi

describe.skip('Endereços', () => {

    it.skip('Busca todos os endereços', async () => {

        await spec()
            .get(`${UrlBase}/api/enderecos`)
            .expectStatus(200)
            .expectJsonLength('data', 8) //4 endereço dentro do atributo data

    })

    it('Busca endereço por ID válido', async () => {

        await spec().get(`${UrlBase}/api/enderecos/1`)
            .expectStatus(200)
            .expectJsonLike({
                "data": {
                    "id": 1,
                    "attributes": {
                        "Endereco": "Rua Mafalda",
                        "createdAt": "2024-04-08T22:33:57.513Z",
                        "updatedAt": "2024-04-08T22:34:00.384Z",
                        "publishedAt": "2024-04-08T22:34:00.374Z",
                        "numero": "10"
                    }
                }
            })


    })

    it('Busca endereço por ID inválido', async () => {

        await spec()
            .get(`${UrlBase}/api/enderecos/2`)
            .expectStatus(404)
            .expectJsonLike({

                "data": null,
                "error": {
                    "status": 404,
                    "name": "NotFoundError",
                    "message": "Not Found",
                    "details": {}
                }

            })




    })

    it('Cadastra um endereço', async () => {
        
        await spec()
            .post(`${UrlBase}/api/enderecos`)
            .withBearerToken(`${token}`)
            .withBody({
                "data":
                {
                    "Endereco": `${streetName}`,
                    "numero": `${randomNumber}`
                }

            })
            .expectStatus(200)
            
            
    })

    it('Atualiza um endereço', async () => {
        
        await spec()
            .put(`${UrlBase}/api/enderecos/14`)
            .withBearerToken(`${token}`)
            .withBody({
                "data":
                {
                    "Endereco": `${streetName}`,
                    "numero": `${randomNumber}`
                }

            })
            .expectStatus(200)
            console.log(streetName)
            
    })

    it.skip('Deleta endereço', async () => {

        await spec()
            .delete(`${UrlBase}/api/enderecos/16`)
            .expectStatus(200)

    })
   
    it('Não deve deletar endereço inexistente', async () => {

        await spec()
            .delete(`${UrlBase}/api/enderecos/500`)
            .expectStatus(404)

    })

})
