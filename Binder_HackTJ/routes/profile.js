const express = require('express');
var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true}))


router.post('', function(req, res) {
    console.log(req.body)
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var grade = req.body.gradelevel;
    var school = req.body.school;
    var address = req.body.address;
    var contact_info = req.body.contact_info;
    var tutor_tutee = req.body.tutor_tutee;
    
    var sqlQuery = 'INSERT INTO login_info (firstname, lastname, grade, school, address, contact_info) VALUES ("' + firstname + '","' + lastname + '","' + grade + '","' + school + '","' + address + '","' + contact_info + '","' + tutor_tutee + '");'
    res.app.locals.pool.query(sqlQuery, function(error, results,fields) {
        /*console.log(error);
        if (error !== null) {
            var params = {
                'message' : 'Username already taken'
            }
            res.render('/', params)
        } else {
            res.render('/');
        }*/
        res.render('login')
    });
})

module.exports = router;