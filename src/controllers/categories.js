const { categoriesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const handleResponse = (res, { status, data }) => {
  res.status(mapStatusHTTP(status)).json(data);
};

const create = async (req, res) => {
  const { name } = req.body;
  handleResponse(res, await categoriesService.create(name));
};

const fetchAll = async (req, res) => {
  handleResponse(res, await categoriesService.fetchAll());
};

module.exports = {
  create,
  fetchAll,
};
