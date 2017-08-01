var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var usernameLengthChecker = function (username) {
    if (!username)
        return false;
    else {
        if (username.length < 5 || username.length > 15) {
            return false
        } else {
            const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
            return regExp.test(username); // Return regular expression test result (true or false)
        }
    }
};

const usernameValidator = [{
    validator: usernameLengthChecker,
    message: 'Username must be between 5 to 10 character long and must not have any special characters'
}];

var userSchema = new Schema({
    //email: {type: String, require: true, unique: true, lowercase: true},
    username: {type: String, require: true, unique: true, lowercase: true, validate: usernameValidator},
    password: {type: String, require: true},
    created: {type: Date, default: Date.now()}
});


// Middleware for encrypt password
userSchema.pre('save', function (next) {
    // Ensure password is new / modified before applying encryption
    if (!this.isModified('password'))
        return next();
    // Apply encryption
    bcrypt.hash(this.password, null, null, function (err, hash) {
        if (err) return next(err); 
        this.password = hash; // encryption password
        next();
    });
});


userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

var User = module.exports = mongoose.model('User', userSchema);

module.exports.addUser = function (user, callback) {

    User.create(user, callback);

};