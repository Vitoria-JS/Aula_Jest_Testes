const generatedId = require('../../src/utils/generateUUID');

//se é possivel gerar um uuid único.

// se esta vindo o ID
// se esse id é uma string
//se o tamanho da string é o que eu espero, 36caracteres.
//caso de teste "it"
describe("generateUUID", () =>{
    it("se é possivel gerar um uuid único", () => {
        const id = generatedId();

        expect(id).toBeDefined();
        expect(typeof id).toBe("string");
        expect(id).toHaveLength(36);
    });
});