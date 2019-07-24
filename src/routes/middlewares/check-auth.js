const jwt = require('jsonwebtoken');
const config = require('../../configs');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.auth.jwt_secret);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Auth fail' });
    }
}