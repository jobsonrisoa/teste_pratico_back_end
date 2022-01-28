module.exports = {
  test: {
    client: 'pg',
    version: '12.9',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'senha',
      database: 'teste_pratico',
    },
    migrations: {
      directory: 'src/migrations',
    },
  },
};
