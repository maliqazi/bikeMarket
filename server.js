
var express = require('express');
var session = require('express-session')
var app = express();

var bodyParser = require('body-parser');

app.use(session({secret: 'mysession'}));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');

app.use(express.static(__dirname + '/bikeMarket-app/dist'));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bike_market');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
 first_name: String,
 last_name: String,
 email: String,
 password: String,
 bicycles: [{type: Schema.Types.ObjectId, ref: 'Bicycle'}]
}, { timestamps: true })

var BicycleSchema = new mongoose.Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  description: String,
  price: String,
  location: String
})

mongoose.model('User', UserSchema);
mongoose.model('Bicycle', BicycleSchema);

var User = mongoose.model('User');
var Bicycle = mongoose.model('Bicycle');

mongoose.Promise = global.Promise;

app.get('/api/checkSession', function(req,res) {
  console.log('from server js, session is ', req.session.name)
  res.json({sessionName:req.session.name})
})

app.get('/api/clearSession', function(req,res) {
  req.session.name='';
  console.log('from server js, clearning session', req.session.name)
  res.json({sessionName:req.session.name})
})

app.get('/api/user/:login_email&:login_password', function(req, res) {
   console.log('session id before login is ', req.session )
    console.log('from server js', req.params)

    User.find({'email': req.params.login_email, "password": req.params.login_password}, function(err, user) {
      console.log('returned from mongo', user)
      req.session.name = req.params.login_email+'session'
      console.log('session id is ', req.session.name )
      res.json({user:user, sessionName:req.session.name})
    })
})

app.get('/api/user/:login_email&:login_password', function(req, res) {
   console.log('session id before login is ', req.session )
    console.log('from server js', req.params)

    User.find({'email': req.params.login_email, "password": req.params.login_password}, function(err, user) {
      console.log('returned from mongo', user)
      req.session.name = req.params.login_email+'session'
      console.log('session id is ', req.session.name )
      res.json({user:user, sessionName:req.session.name})
    })
})

app.get('/api/user/:_id', function(req, res) {
    console.log('getting user for contact', req.params)
    User.find({'_id': req.params._id}, function(err, user) {
      console.log('returned from mongo', user)
      res.json({user:user})
    })
})

app.post('/api/user', function(req, res) {
    var user = new User(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
      }
    )
    user.save(function(err) {
      if(err) {
        console.log('error occured');
        res.json({errors: user.errors})
      }
      else {
        console.log('successfully added document');
        req.session.name = req.body.email+'session';
        console.log('session id is ', req.session.name )
        res.json({user:user, sessionName:req.session.name});
      }
    })
})

app.post('/api/bicycle', function(req, res) {
    User.findOne({_id: req.body.user_id}, function(err, user) {
      console.log('user returend from mongo', user)
      console.log('req.body data',               req.body.bicycle.title,
                     req.body.bicycle.description,
                     req.body.bicycle.price,
                     req.body.bicycle.location)
      var bicycle = new Bicycle({title: req.body.bicycle.title,
                    description: req.body.bicycle.description,
                    price: req.body.bicycle.price,
                    location: req.body.bicycle.location
       })
       bicycle._user = user._id;

       bicycle.save(function(err) {
         user.bicycles.push(bicycle);
         user.save(function(err) {
           if(err) {
             console.log('Error');
           }
           else {
             res.json({bicycle:bicycle, sessionName:req.session.name});
           }
         })
       })
    })
 })

 app.post('/api/bicycle/update', function(req,res) {
   console.log('updating bike in mongo', req.body)
   Bicycle.update({_id: req.body._id}, {$set: {title: req.body.title, description: req.body.description, price: req.body.price, location: req.body.location}}
   , function(err,bicyles) {
     res.json({bicycle:bicyles})
   })
 })

 app.get('/api/bicycle/:_id', function(req, res) {
     console.log('get user bicycles', req.params)
     Bicycle.find({_user: req.params._id}, function(err, bicycle) {
       console.log("returned bicycles from mongodb", bicycle);
       res.json({bicycle:bicycle})
     })
 })

 app.get('/api/bicycle', function(req, res) {
     console.log('get all bicycles', req.params)
     Bicycle.find({}, function(err, bicycle) {
       console.log("returned all bicycles from mongodb", bicycle);
       res.json({bicycle:bicycle})
     })
 })


 app.post('/api/deleteBicycle', function(req,res) {
    console.log("beofre deleting form db", req.body)
    Bicycle.remove({_id: req.body._id}, function(err, bicycles){
      res.json({data: req.body})
    })
 })

app.all("*", (request, response, next) => { response.sendFile(path.resolve("./bikeMarket-app/dist/index.html")) });
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
