const UserService = require('./user.service');

exports.signup = async (req, res) => {
    const users = await UserService.getByEmail(req.body.email);
    if (users.length > 0) {
        return res.status(409).json({ message: 'Mail is already exist.' });
    } else {
        const result = await UserService.create(req.body.email, req.body.password);
        res.status(200).json(result);
    }
}

exports.signin = async (req, res) => {
    var result = await UserService.signIn(req.body.email, req.body.password);

    if (result === null) {
        res.status(401).json(result);
    }
    res.status(200).json(result);
}