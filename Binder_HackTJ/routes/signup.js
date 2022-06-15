const express = require('express');
var router = express.Router();

router.get('/signup', function(req, res) {
    var params = {
        'message' : ''
    }
    res.render('signup', params);
})
router.post('/form_signup', function(req, res) {
    console.log(req.body.txtUsername);
    console.log(req.body.txtPassword);
    var username = req.body.txtUsername;
    var password = req.body.txtPassword;
    var sqlQuery = 'INSERT INTO users (username, password) VALUES ("' + username + '","' + password + '");'
    res.app.locals.pool.query(sqlQuery, function(error, results,fields) {
        console.log(error);
        if (error !== null) {
            var params = {
                'message' : 'Username already taken'
            }
            res.render('signup', params)
        } else {
            var params = {
                'username' : username
            }
            res.render('createProfile',params);
        }
    });
})

module.exports = router;