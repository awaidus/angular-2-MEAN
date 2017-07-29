const crypto = require('crypto');
crypto.randomBytes(256).toString('hex');

var config = {
    db: 'angular-2',
    secret: crypto,
    uri: 'mongodb://localhost:27017/' + this.db
};

module.exports = config;