const express = require('express');

const userRoutes = express.Router();

const { userController } = require('../controllers');
const { validateLogin, validateCreateUser } = require('../middlewares/user.middleware');
const authMiddleware = require('../middlewares/auth.middlewares');

userRoutes.post('/login', validateLogin, userController.login);
userRoutes.post('/user', validateCreateUser, userController.create);

userRoutes.get('/user', authMiddleware, userController.fetchAll);
userRoutes.get('/user/:id', authMiddleware, userController.getId);
userRoutes.delete('/user/me', authMiddleware, userController.removeUser);

module.exports = userRoutes;