#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')  //downloaded
var app = express();
//var cookieSession = require('cookie-session')
//const { AuthorizationCode } = require('simple-oauth2');

//var https = require('https');
var hbs = require('hbs'); //downloaded 

//app.set('trust proxy', 1)
app.set('view engine', 'hbs');

/*app.use(cookieSession({
    name: 'snorkles',
    keys: ['SomeSecretKeys123', 'ThatYouShouldChange']
})) 

var ion_client_id = 'ZY6elwKumgaQllUUzRtI8o5bBVfb86TOXar9dNuA';
var ion_client_server = 'hxB2S5jfUgy6IGTMUC353HoSV0AcFYtvyJTdSc0J8nvpAE0iPSyd3MO6Ba4gj9tLgUnY5MGxIv5SoqlMeFSkxtBs2uF8FhUHgXxg4JTvuw8syucpVvhVHWu0EE5MEpMA';
var ion_redirect_url = 'https://tutormatch.sites.tjhsst.edu/log-in';
*/
var mysql = require('mysql'); //downloaded
var sql_params = {
  connectionLimit : 10,
  user            : process.env.DIRECTOR_DATABASE_USERNAME,
  password        : process.env.DIRECTOR_DATABASE_PASSWORD,
  host            : process.env.DIRECTOR_DATABASE_HOST,
  port            : process.env.DIRECTOR_DATABASE_PORT,
  database        : process.env.DIRECTOR_DATABASE_NAME
}

app.locals.pool  = mysql.createPool(sql_params);
app.use(express.static('static_files'))

const loginJS = require('./routes/login.js');
app.use(loginJS);

const errorJS = require('./routes/error.js');
app.use(errorJS);

const matchtutor = require('./routes/matchTutor.js');
app.use(matchtutor);

const myprofile = require('./routes/myProfile.js');
app.use(myprofile);

const signup = require('./routes/signup.js');
app.use(signup);

const createProfile = require('./routes/createProfile.js');
app.use(createProfile);

const profileToTutor = require('./routes/profileToTutor.js');
app.use(profileToTutor);

const twilioJS = require('./routes/twilio.js');
app.use(twilioJS);
// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 
/*var client = new AuthorizationCode({
    client: {
        id: ion_client_id,
        secret: ion_client_server,
    },
    auth: {
        tokenHost: 'https://ion.tjhsst.edu/oauth/',
        authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
        tokenPath: 'https://ion.tjhsst.edu/oauth/token'
    }
});

var authorizationUri = client.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_url
});

console.log(authorizationUri)

function checkAuthentication(req, res, next) {
    if ('authenticated' in req.session) {
        next()
    } else {
        res.render('login', {'login link' : authorizationUri })
    }
}

function getUserName(req, res, next) {
    var access_token = req.session.token.access_token;
    var profile_url = 'https://ion.tjhsst.edu/api/profile?format=json&access_token_token='+access_token;
    
    https.get(profile_url, function(response) {
        var rawData = '';
        response.on('data', function(chunk) {
            rawData += chunk;
        });
        
        response.on('end', function() {
            res.locals.profile = JSON.parse(rawData);
            next();
        });
        
    }).on('error', function(err){
        next(err)
    });
}

app.get('/', [checkAuthentication, getUserName], function (req, res) {
    var profile = res.locals.profile;
    var first_name = profile.first_name;
    
    res.render('matching', {'user' : first_name}); //change this
});

app.get('/logout', function(req, res) {
    delete req.session.authenticated;
    res.redirect('https://tutormatch.sites.tjhsst.edu/error');
    
});

async function convertCodeToToken(req, res, next) {
    var theCode = req.query.code;
    
    var options = {
        'code': theCode, 
        'redirect_uri': ion_redirect_uri,
        'scope': 'read'
    };
    
    try {
        var accessToken = await client.getToken(options);
        res.locals.token = accessToken.token;
        next();
    } catch (error) {
        console.log('Access Token Error', error.message);
        res.send(502);
    }
}

app.get('/', [convertCodeToToken], function(req, res) {
    req.session.authenticated = true;
    req.session.token = res.local.token;
    
    res.redirect('https://tutormatch.sites.tjhsst.edu/login');
}) */
app.get('/', function(req, res) {
    res.render('login');
})
var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});