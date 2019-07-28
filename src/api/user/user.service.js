const mongoose = require('mongoose');

const Hash = require('../../utils/hash');
const JwtToken = require('../../utils/jwt-token');

const User = require('./user.model');
const UserDao = require('./user.dao');

class UserService {

    constructor() { }

    static async create(email, password) {
        const encryptedPass = Hash.encode(password, 10);
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: encryptedPass
        });
        return UserDao.create(user);
    }

    static async getByEmail(email) {
        return UserDao.getByEmail(email);
    }

    static async signIn(email, password) {
        let result = null;
        const users = await this.getByEmail(email);
        if (users.length > 0) {
            const isSame = Hash.compare(password, users[0].password);
            if (isSame) {
                result = {
                    message: 'Auth successfull!',
                    token: JwtToken.generate(users[0].id, email)
                }
            } else {
                result = {
                    message: 'Auth fail!',
                    token: null
                }
            }
        }
        return result;
    }

}

module.exports = UserService;
