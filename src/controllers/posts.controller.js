const { postService, createPost } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const create = async (req, res) => {
  const { title, content, categoryIds, authorId } = req.body;
  const newDate = new Date().toISOString();
  const userId = Number(authorId);

  const { status, data } = await createPost.create({
    title, content, categoryIds, userId, updated: newDate, published: newDate,
  });

  return res.status(mapStatusHTTP(status)).json(data);
};

const fetchAll = async (req, res) => {
  const { status, data } = await postService.fetchAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postService.getId(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const update = async (req, res) => {
  const { title, content, authorId } = req.body;
  const { id } = req.params;

  const { status, data } = await postService.update(id, title, content, authorId);
  return res.status(mapStatusHTTP(status)).json(data);
};

const removePost = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postService.removePost(id);

  if (status === 'NOT_FOUND') return res.status(mapStatusHTTP(status)).json(data);

  return res.status(mapStatusHTTP(status)).json();
};

module.exports = { create, fetchAll, getId, update, removePost };
