const bcrypt = require('bcrypt');

class Hash {

    static encode(input, salt) {
        return bcrypt.hashSync(input, salt);
    }

    static compare(data, encrypted) {
        return bcrypt.compareSync(data, encrypted);
    }
}

module.exports = Hash;
