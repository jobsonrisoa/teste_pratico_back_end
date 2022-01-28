module.exports = (app) => {
  app.route('/boleto')
    // .get(app.routes.users.findAll)
    .post(app.routes.boletos.create);
};
