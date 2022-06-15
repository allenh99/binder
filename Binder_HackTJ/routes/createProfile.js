const express = require('express');
var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true}))


router.post('/form_createProfile', function(req, res, next) {
    console.log(req.body)
    //console.log(req.body.firstname);
    //console.log(req.body.lastname);
    var username = req.body.confirm_username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var grade = req.body.gradelevel;
    var school = req.body.school;
    var address = req.body.address;
    var contact_info = req.body.contact_info;
    var tutor_tutee = 'Tutee';
    var sqlQuery = 'INSERT INTO login_info (username, firstname, lastname, grade, school, address, contact_info, tutor_tutee) VALUES ("'+ username +'","' + firstname + '","' + lastname + '","' + grade + '","' + school + '","' + address + '","' + contact_info + '","' + tutor_tutee + '");'
    res.app.locals.pool.query(sqlQuery, function(error, results,fields) {
        console.log(error)
        res.render('login')
    });
})

module.exports = router;