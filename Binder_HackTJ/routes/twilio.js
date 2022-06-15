const twilio = require('twilio');
const express = require('express');
var router = express.Router();



const accountSid = 'AC62ba4b863427d89d2090f16de29a95a4'; 
const authToken = '1ec5c3b34ad4eccb93a9825ca21844fb'; 
const client = require('twilio')(accountSid, authToken); 
 
router.get('/send_message', function(req, res, next){
    var phone = req.query.phone;
    console.log("Phone: " + phone)
    sendMessage(phone);
    next();
    }, function(req, res) {
        var sqlQuery = "SELECT * FROM tutor_info;"
        res.app.locals.pool.query(sqlQuery, function(error,results,fields){
            res.render('matching',{data: results});
        })
})
function sendMessage(phone) {
      client.messages 
      .create({ 
         body: 'A Tutee is interested in your service!',  
         messagingServiceSid: 'MG8fd3943c37b774ba82e1b3b93c0b831d',      
         to: '+1'+ phone 
       }) 
      .then(message => console.log(message.sid)) 
      .done();  
}
module.exports = router;