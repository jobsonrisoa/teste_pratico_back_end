import jest from 'jest';

const request = require('supertest');

const app = require('../src/app');

jest.test('Deve responder na raiz', () => request(app).get('/').then((res) => jest.expect(res.status).toBe(200)));
