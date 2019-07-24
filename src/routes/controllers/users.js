const mongoose = require('mongoose');

const User = require('../../db/models/user');
const Hash = require('../../utils/hash');
const JwtToken = require('../../utils/jwt-token');

exports.signup = async (req, res, next) => {
    const users = await User.find({ email: req.body.email }).exec();
    if (users.length > 0) {
        return res.status(409).json({ message: 'Mail is already exist.' });
    } else {
        try {
            const encryptedPass = Hash.encode(req.body.password, 10);
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: encryptedPass
            });
            const result = await user.save();
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

exports.signin = async (req, res, next) => {
    const users = await User.find({ email: req.body.email }).exec();
    if (users.length > 0) {
        const result = Hash.compare(req.body.password, users[0].password);
        console.log(result);
        if (result) {
            const token = JwtToken.generate(users[0]._id, users[0].email);
            res.status(200).json({
                message: 'Auth successfull!',
                token: token
            });
        }
    }
    res.status(401).json({ message: 'Auth fail!' });
}