const { BlogPost, Category, User } = require('../models');

const fetchAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 'SUCCESSFUL', data: posts };
};

const getId = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }

  return { status: 'SUCCESSFUL', data: post };
};

const update = async (id, title, content) => {
  await BlogPost.update({ title, content }, { where: { id } });

  const { data: { dataValues } } = await getId(id);

  return { status: 'SUCCESSFUL', data: dataValues };
};

const removePost = async (id, _authorId) => {
  const post = await BlogPost.destroy({ where: { id } });

  return { status: 'DELETED', data: post };
};

module.exports = { fetchAll, getId, update, removePost };
