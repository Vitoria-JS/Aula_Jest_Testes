//subir o servidor no supertest
// criar variavel de ambiente para rodar o teste no bd teste

const request = require("supertest")
const app = require('../../src/app');
const {cpf} = require("cpf-cnpj-validator");
const connection = require('../../src/database');
const truncate = require('./truncate');

describe("MANAGERS", () => {

    afterAll(() => {
        connection.close();
    });

    beforeAll(async(done) => {
        await truncate(connection.models);
        done();
    })

    it("é possivel criar um novo gerente", async() => {
        const response = await request(app).post("/managers").send({
            name: "Vitoria Rocha",
            cpf: cpf.generate(),
            email: "vitoriarocha1818@gmail.com",
            cellphone: "5511952848516",
            password: "123456",
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id");
    });
    it("não é possível cadastrar um gerente com cpf existente"), async() => {
        let cpfGerente = cpf.generate();
        let response = await request(app).post("/managers").send({
            name: "Vitoria",
            cpf: cpfGerente,
            email: "vitoria1818@gmail.com",
            cellphone: "5511952848518",
            password: "123456",
        });

        response = await request(app).post("/managers").send({
            name: "Vitoria Rochaa",
            cpf: cpfGerente,
            email: "vitoriarocha181818@gmail.com",
            cellphone: "5511952848519",
            password: "123456",
        });
        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("cpf already exists")
    }
});