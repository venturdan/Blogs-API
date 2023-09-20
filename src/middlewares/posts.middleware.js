const { postService } = require('../services');

const validatePost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validateUser = async (req, res, next) => {
    const { authorId } = req.body;
    const { id } = req.params;

    const { status, data } = await postService.getId(id);
    
    if (status === 'NOT_FOUND') {
        return res.status(404).json({ message: 'Post does not exist' });
    }
    
    const { dataValues: { userId } } = data;
    
    if (status === 'NOT_FOUND' || userId !== authorId) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
    
    next();
};

const validateData = (req, res, next) => {
  const { title, content } = req.body;

  if (!title && !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = { validatePost, validateUser, validateData };
