const express = require('express');
var router = express.Router();

router.get('/matchTutor', function(req, res, next) {
    
    var sqlQuery = "SELECT * FROM tutor_info"
    res.app.locals.pool.query(sqlQuery, function(error,results,fields){
        console.log(req.app.locals.pool.query)
        next();
    })
    },
    
    
    function(req,res){
    var sqlQuery = "SELECT * FROM tutor_info;"
    
    res.app.locals.pool.query(sqlQuery, function(error,results,fields){
        console.log("RESULTS:")
        console.log(results);
        
        //var obj = results[1]['name'];
        //console.log(obj);
        res.render('matching',{data: results});
        
    })
})

module.exports = router;