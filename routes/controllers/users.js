const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../db/models/user');

exports.signup = (req, res, next) => {
    (req, res, next) => {
        User.find({ email: req.body.email })
            .exec()
            .then(users => {
                if (users.length > 0) {
                    return res.status(409).json({ message: 'Mail is already exist.' });
                } else {
                    bcrypt.hash(req.body.password, 10, (error, hash) => {
                        if (error) {
                            res.status(500).json({ error: error });
                        } else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash
                            });
                            user.save()
                                .then(result => {
                                    console.log(result);
                                    res.status(200).json(result);
                                }).catch(error => {
                                    console.log(error);
                                    res.status(500).json(error);
                                });
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json(error);
            });
    }
}

exports.signin = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(users => {
            if (users.length == 0) {
                res.status(401).json({ message: 'Auth fail!' });
            } else {
                bcrypt.compare(req.body.password, users[0].password, (error, same) => {
                    if (error) {
                        res.status(401).json({ message: 'Auth fail!' });
                    }
                    if (same) {
                        const token = jwt.sign(
                            {
                                email: users[0].email,
                                userId: users[0]._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1h"
                            }
                        )
                        res.status(200).json({
                            message: 'Auth successfull!',
                            token: token
                        });
                    } else {
                        res.status(401).json({ message: 'Auth fail!' });
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
}