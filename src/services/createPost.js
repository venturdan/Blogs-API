const Sequelize = require('sequelize');
const camelize = require('camelize');
const { BlogPost, PostCategory, Category } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const create = async (values) => {
  const { title, content, categoryIds, userId, updated, published } = values;

  const validate = await Category.findAll({ where: { id: categoryIds } });

  if (validate.length !== categoryIds.length) {
    return {
      status: 'UNAUTHENTICATED',
      data: { message: 'one or more "categoryIds" not found' },
    };
  }

  const result = await sequelize.transaction(async (transaction) => {
    const { dataValues } = await BlogPost.create(
      { title, content, userId, updated, published },
      { transaction },
    );

    const ids = categoryIds.map((categoryId) => ({ postId: dataValues.id, categoryId }));

    await PostCategory.bulkCreate(camelize(ids), { transaction });
    return dataValues;
  });

  return { status: 'CREATED', data: result };
};

module.exports = { create };
