const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validateCreateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (displayName.length < 8) {
    return res
      .status(mapStatusHTTP('UNAUTHENTICATED'))
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  const isValidEmail = validateEmail(email);

  if (!isValidEmail) {
    return res
      .status(mapStatusHTTP('UNAUTHENTICATED'))
      .json({ message: '"email" must be a valid email' });
  }

  if (password.length < 6) {
    return res
      .status(mapStatusHTTP('UNAUTHENTICATED'))
      .json({ message: '"password" length must be at least 6 characters long' });
  }

  next();
};

module.exports = {
  validateLogin,
  validateCreateUser,
};
