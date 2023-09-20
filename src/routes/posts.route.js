const express = require('express');

const postRoutes = express.Router();

const { postController } = require('../controllers');

const authMiddleware = require('../middlewares/auth.middlewares');
const { validatePost, validateUser, validateData } = require('../middlewares/posts.middleware');

postRoutes.post('/post', authMiddleware, validatePost, postController.create);
postRoutes.get('/post', authMiddleware, postController.fetchAll);
postRoutes.get('/post/:id', authMiddleware, postController.getId);
postRoutes.put('/post/:id', authMiddleware, validateUser, validateData, postController.update);
postRoutes.delete('/post/:id', authMiddleware, validateUser, postController.removePost);

module.exports = postRoutes;