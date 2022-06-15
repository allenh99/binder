const express = require('express');
var router = express.Router();

router.get('/myProfile', function(req, res) {
    data = {
        firstname: "Evan",
        lastname: "Zhang",
        grade: "11th"
    }
    res.render("profile",data);
})

module.exports = router;