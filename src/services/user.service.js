const { User, BlogPost } = require('../models');
const { createToken } = require('../utils/tokenValidate');

const unauthenticated = {
  status: 'UNAUTHENTICATED',
  data: { message: 'Invalid fields' },
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return unauthenticated;
  }

  const token = createToken(user);
  return { status: 'SUCCESSFUL', data: { token } };
};

const create = async (displayName, email, password, image) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  const createdUser = await User.create({ displayName, email, password, image });
  const token = createToken(createdUser);

  return { status: 'CREATED', data: { token } };
};

const fetchAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 'SUCCESSFUL', data: users };
};

const getId = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  }

  return { status: 'SUCCESSFUL', data: user };
};

const removeUser = async (id) => {
  await BlogPost.destroy({ where: { userId: id } });
  await User.destroy({ where: { id } });
  return { status: 'DELETED' };
};

module.exports = {
  login,
  create,
  fetchAll,
  getId,
  removeUser,
};
