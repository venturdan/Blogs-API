const express = require('express');

const userRoutes = express.Router();

const { categoriesController } = require('../controllers');
const { validateCategories } = require('../middlewares/categories.middleware');
const authMiddleware = require('../middlewares/auth.middlewares');

userRoutes.post('/categories', validateCategories, authMiddleware, categoriesController.create);
userRoutes.get('/categories', authMiddleware, categoriesController.fetchAll);

module.exports = userRoutes;