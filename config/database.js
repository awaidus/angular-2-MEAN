const crypto = require('crypto');
crypto.randomBytes(256).toString('hex');

var config = {
    uri: 'mongodb://localhost:27017/angular-2',
    db: 'angular-2',
    secret: crypto
};

module.exports = config;