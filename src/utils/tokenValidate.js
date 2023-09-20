const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const createToken = (user) => {
    const jwtPlayload = {
        sub: user.id,
        name: user.displayName,
    };

    const jwtConfig = {
        algorithm: 'HS256',
        expiresIn: '1d',
    };

    const token = jwt.sign(jwtPlayload, secret, jwtConfig);

    return token;
};

module.exports = {
    createToken,
};