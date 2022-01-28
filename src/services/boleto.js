module.exports = (app) => {
  const findAll = () => app.db('boletos').select().first();
  const save = (boleto) => app.db('boletos').insert(boleto, '*');
  return { findAll, save };
};
