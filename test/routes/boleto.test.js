const request = require('supertest');

const app = require('../../src/app');

const MAIN_ROUTE = '/boleto';

// Mudar o valor do id
test('Deve inserir um boleto com sucesso', () => request(app).post(MAIN_ROUTE)
  .send({ id: 150, linha_digitavel: '21290001192110001210904475617405975870000002000' })
  .then((result) => {
    expect(result.status).toBe(201);
    expect(result.body.linha_digitavel).toBe('21290001192110001210904475617405975870000002000');
  }));

// Mudar o valor do id
test('Deve listar todos os boletos', () => {
  app.db('boletos')
    .insert({ id: 250, linha_digitavel: '21290001192110001210904475617405975870000002000' })
    .then(() => request(app).get(MAIN_ROUTE))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});
