var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/register', function (req, res, next) {
    res.send('GET register clicked');
});


router.post('/register', function (req, res, next) {
    if (!req.body.username) {
        res.json({success: false, message: 'Username must be provided'})
    } else {
        if (!req.body.password) {
            res.json({success: false, message: 'Password must be provided'})
        } else {
            User.addUser(req.body, function (err) {
                if (err) {
                    if (err.code === 11000) {
                        res.json({success: false, message: 'Username is already exist.'});
                    } else {
                        res.json({success: false, message: 'Could not save. Error: ' + err});
                    }
                }
                else res.json({success: true, message: 'User is created'});
            });
            // var user = new User({
            //     username: req.body.username.toLowerCase(),
            //     password: req.body.password.toLowerCase()
            // });
            // user.save(function (err) {
            //     if (err) {
            //         if (err.code === 11000) {
            //             res.json({success: false, message: 'Username is already exist.'});
            //         } else {
            //             res.json({success: false, message: 'Could not save. Error: ' + err});
            //         }
            //     }
            //     else res.json({success: true, message: 'User is created'});
            // });
        }
    }
});

module.exports = router;
