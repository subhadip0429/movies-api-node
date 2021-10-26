const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.buildHash = (plainText) => {
    return bcrypt.hash(plainText, saltRounds);
}

module.exports.compare = (plainText, hashedText) => {
    return bcrypt.compare(plainText, hashedText);
}
