module.exports = (app) => {
  const save = (boleto) =>
  // if (!boleto.linhaDigitavel) return { error: 'Linha Digitável é um atributo obrigatório' };

    // eslint-disable-next-line implicit-arrow-linebreak
    app.db('boletos').insert(boleto, '*');
  return { save };
};
