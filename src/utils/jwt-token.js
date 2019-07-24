const jwt = require('jsonwebtoken');
const config = require('../configs');

class JwtToken {

    static generate(userId, email) {
        const payload = {
            userId: userId,
            email: email
        };
        const options = {
            expiresIn: config.auth.jwt_expires_in
        }
        return jwt.sign(payload, config.auth.jwt_secret, options);
    }

}

module.exports = JwtToken;
