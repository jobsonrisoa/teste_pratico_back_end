module.exports = (app) => {
  app.route('/boleto')
    .get(app.routes.boletos.getAll)
    .post(app.routes.boletos.create);
};
