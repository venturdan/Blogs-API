const { Category } = require('../models');

const create = async (name) => {
  const category = await Category.create({ name });
  return { status: 'CREATED', data: category };
};

const fetchAll = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  create,
  fetchAll,
};
