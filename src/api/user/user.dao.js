const userModel = require('./user.model');

class UserDao{

    static async create(user) {
        return user.save();
    }

    static async getByEmail(email) {
        return userModel.find({ email: email }).exec();
    }

}

module.exports = UserDao;
