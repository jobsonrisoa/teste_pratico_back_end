const request = require('supertest');

const app = require('../../src/app');

const MAIN_ROUTE = '/boleto';

test('Deve inserir um boleto com sucesso', () => request(app).post(MAIN_ROUTE)
  .send({ linha_digitavel: '21290001192110001210904475617405975870000002000' })
  .then((result) => {
    expect(result.status).toBe(201);
    expect(result.body.linha_digitavel).toBe('21290001192110001210904475617405975870000002000');
  }));
