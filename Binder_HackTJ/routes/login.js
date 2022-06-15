const express = require('express');
var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true}))

router.post('/form_render', function(req, res) {
    console.log(req.body.txtEmail);
    console.log(req.body.txtPassword);
    var username = req.body.txtEmail;
    var password = req.body.txtPassword;
    var sqlQueryUser = 'SELECT * from users WHERE username = "' + username + '";'
    res.app.locals.pool.query(sqlQueryUser, function(error, results,fields) {
        console.log("Error: " + error);
        console.log("Results: " + results);
        console.log("Fields: " + fields);
        if (results == "") {
            console.log("Username not in database")
            var params = {
                'message' : 'Username is incorrect'
            }
            res.render('login', params);
        } else {
            if (password != results[0].password) {
                console.log("Password does not match")
                var params2 = {
                    'message' : 'Password is incorrect'
                }
                res.render('login', params2);
            } else {
                var sqlQueryProfile = 'SELECT * from login_info WHERE username = "' + username + '";'
                res.app.locals.pool.query(sqlQueryProfile, function(error, results,fields){
                    console.log("Profile Results: " + JSON.stringify(results));
                    var params = {
                        'username': results[0].username,
                        'firstname' : results[0].firstname,
                        'lastname' : results[0].lastname,
                        'grade' : results[0].grade,
                        'school': results[0].school,
                        'address': results[0].address,
                        'contact_info': results[0].contact_info,
                        'tutor_tutee' : results[0].tutor_tutee
                    }
                    res.render('profile',params);
                })
            }
        }
    })
})
module.exports = router;