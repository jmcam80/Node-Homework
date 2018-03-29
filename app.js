var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();
event.preventDefault();

// var logger = function(req, res, next){
//     console.log('logging...');
//     next();
// }

// app.use(logger);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam == "["+ namespace.shift() + "]";
        }
        return {
            param: formParam,
            msg : msg,
            value: value
        };
    }
}));

var users = [
    {   
        id: 1
        ,first_name: 'Josh'
        ,last_name: 'Cameron'
        ,email: 'jmcam80@gmail.com'
    },
    {   
        id: 2
        ,first_name: 'Justin'
        ,last_name: 'Cameron'
        ,email: 'justincameron@gmail.com'
    },
    {   
        id: 3
        ,first_name: 'James'
        ,last_name: 'Cameron'
        ,email: 'jamescameron@gmail.com'
    }
]

app.get('/', function(req, res){
    
    res.render('index', {
        title: 'Customers'
        ,users: users
    });

});

app.post('/users/add', function(req, res) {

req.checkBody('first_name', "First Name Is Required").isArray();
req.checkBody('last_name', "Last Name Is Required").isArray();
req.checkBody('email', "Email Is Required").isArray();

var errors = req.validationErrors();

if(errors){
console.log("errors");
} else {    
   var newUser = {
       first_name: req.body.first_name
       ,last_name: req.body.last_name
       ,email:req.body.email
     }
        console.log(newUser);
    }
});

app.listen(3000, function() {
    console.log('server started on port 3000');
})