"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _uniqid = _interopRequireDefault(require("uniqid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
var users = [{
  'id': (0, _uniqid["default"])(),
  'name': 'andra manday',
  'email': 'andramanday@gmail.com',
  'age': 25
}, {
  'id': (0, _uniqid["default"])(),
  'name': 'anrikonando',
  'email': 'arikuncor@gmail.com',
  'age': 29
}];
app.get('/', function (req, res) {
  res.send('hallo world');
});
/**
Route
 */
// GET DATA USERS

app.get('/users', function (req, res) {
  res.send(users);
}); // GET DATA BY ID

app.get('/users/:idUser', function (req, res) {
  var idUser = req.params.idUser;
  var user = users.filter(function (x) {
    return x.id === idUser;
  });
  res.send(user);
}); // INSERT NEW DATA

app.post('/users', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      email = _req$body.email,
      age = _req$body.age;
  var user = users.push({
    'id': (0, _uniqid["default"])(),
    name: name,
    email: email,
    age: age
  });
  res.status(200).send({
    msg: 'New data Insert',
    user: req.body
  });
}); // UPDATE DATA

app.put('/users/:idUser', function (req, res) {
  var idUser = req.params.idUser;
  var _req$body2 = req.body,
      name = _req$body2.name,
      email = _req$body2.email,
      age = _req$body2.age; //first step get index object

  var index = users.findIndex(function (x) {
    return x.id === idUser;
  });

  if (index > -1) {
    //delete data
    users.splice(index, 1); //push data with id before

    users.push({
      'id': idUser,
      name: name,
      email: email,
      age: age
    });
    res.status(200).send({
      msg: 'update succesful',
      user: req.body
    });
  } else {
    res.status(400).send({
      msg: 'User ID not found'
    });
  }
}); // DELETE DATA

app["delete"]('/users/:idUser', function (req, res) {
  var idUser = req.params.idUser; //first step get index object

  var index = users.findIndex(function (x) {
    return x.id === idUser;
  });

  if (index > -1) {
    //delete data
    users.splice(index, 1);
    res.status(200).send({
      msg: 'delete succesful'
    });
  } else {
    res.status(400).send({
      msg: 'User ID not found'
    });
  }
});
app.listen(3000, function () {
  console.log('server running at localhost:3000');
});