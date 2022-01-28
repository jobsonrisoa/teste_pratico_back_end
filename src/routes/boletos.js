module.exports = (app) => {
  const getAll = (req, res) => {
    app.services.boleto.findAll()
      .then((result) => res.status(200).json(result));
  };

  const create = async (req, res) => {
    const result = await app.services.boleto.save(req.body);
    if (result.error) return res.status(400).json(result);
    return res.status(201).json(result[0]);
  };
  return { getAll, create };
};
