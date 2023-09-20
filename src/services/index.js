const userService = require('./user.service');
const categoriesService = require('./categories.service');
const postService = require('./posts.service');
const createPost = require('./createPost');

module.exports = {
    categoriesService,
    userService,
    postService,
    createPost,
};