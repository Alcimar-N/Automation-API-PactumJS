//const pactum = require('pactum');
const { spec, response } = require('pactum');
require('dotenv').config();
const faker = require('faker');
let token = process.env.tokenStrapi;


let emailFaker = faker.internet.email()
let UrlBase = process.env.BaseUrl

describe('Clientes', () => {

  it('Busca todos os usuários', async () => {
    await spec()
      .get(`${UrlBase}/api/clientes`)
      .expectStatus(200) // valida status code
  })

  it('Busca cliente por ID', async () => {

    await spec().get(`${UrlBase}/api/clientes/1`)
      .expectJsonLike({
        "data": {
          "id": 1,
          "attributes": {
            "Nome": "Teste",
            "Nascimento": "2000-10-23",
            "Email": "teste_tes@hotmail.com",
            "Telefone": "11970465302",
            "Idade": 30,
            "CPF": "12345678910",
            "Altura": 1.72,
            "createdAt": "2024-03-23T05:18:32.041Z",
            "updatedAt": "2024-03-23T05:28:52.840Z",
            "publishedAt": "2024-03-23T05:28:52.831Z"
          }
        }
      })


  })

  it('Busca cliente por ID inválido', async () => {

    await spec().get(`${UrlBase}/api/clientes/159`)
    .expectStatus(404)

  })

  it('Cadastra cliente', async () => {
    await spec()
    .post(`${UrlBase}/api/clientes`)
    .withBearerToken(`${token}`)
    .withBody({
      "data": {
        "Nome": "Novo teste da silva salva",
        "Nascimento": "1970-03-12",
        "Email": `${emailFaker}`,
        "Telefone": "11947741200",
        "Idade": 43,
        "CPF": "7700951010",
        "Altura": 1.78    
    }
    })
    .expectStatus(200)
    
  })

})