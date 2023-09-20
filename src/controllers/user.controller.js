const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, status } = await userService.login(email, password);

  return res.status(mapStatusHTTP(status)).json(data);
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { data, status } = await userService.create(displayName, email, password, image);

  return res.status(mapStatusHTTP(status)).json(data);
};

const fetchAll = async (req, res) => {
  const { data, status } = await userService.fetchAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const getId = async (req, res) => {
  const { id } = req.params;
  const { data, status } = await userService.getId(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const removeUser = async (req, res) => {
  const { authorId } = req.body;

  const { status } = await userService.removeUser(authorId);

  return res.status(mapStatusHTTP(status)).end();
};

module.exports = {
    login,
    create,
    fetchAll,
    getId,
    removeUser,
};