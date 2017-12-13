var express = require('express');
var path = require('path');
var models = require('../DB/models');
var app = express();


/* GET home page. */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views','index.html'));
});

app.get('/SearchRestByNameCity/:name/:city', function(req, res) {
  var rest = req.params['name'];
  var city= req.params['city'];
  models.restsTable.findRest(rest,city).then(function (data) {
    res.json(data);
  });
});

app.get('/SearchRestByName/:name', function(req, res) {
  var name= req.params['name'];
  models.restsTable.findAllRestsByName(name).then(function (data) {
    res.json(data);
  });
});


app.get('/SearchRestByCity/:city', function(req, res) {
  var city= req.params['city'];
  models.restsTable.findAllRestsInCity(city).then(function (data) {
    res.json(data);
  });
});


app.get('/SearchRestByType/:type', function(req, res) {
  var type= req.params['type'];
  models.restsTable.findAllRestsByTypes(type, function (data) {
      res.json(data);
    });
  });


app.get('/SearchRestByNameCityType/:name/:city/:type', function(req, res) {
  var name= req.params['name'];
  var city= req.params['city'];
  var type= req.params['type'];
  models.restsTable.findRestByNameCityType(name, city, type, function (data) {
    console.log(data);
    res.json(data);
  });
});


app.get('/SearchRestByNameType/:name/:type', function(req, res) {
  var name= req.params['name'];
  var type= req.params['type'];
  models.restsTable.findRestByNameType(name, type, function (data) {
    res.json(data);
  });
});


app.get('/SearchRestByCityType/:city/:type', function(req, res) {
  var city= req.params['city'];
  var type= req.params['type'];
  models.restsTable.findRestByCityType(city, type, function (data) {
    res.json(data);
  });
});


app.get('/login/:email/:password', function(req, res) {
  var mail = req.params['email'];
  var password= req.params['password'];
  models.adminsTable.loginAdmin(mail,password).then(function (data) {
    res.json(data);
  });
});


app.get('/adminMenu/', function(req, res) {
  models.restsTable.findAllRests().then(function (data) {
    res.json(data);
  });
});

app.get('/adminMenuOffers/', function(req, res){
  models.offersTable.findAllOffers().then(function (data) {
    res.json(data);
  });
});

app.get('/adminMenuTypes/', function(req, res){
  models.typesTable.findAllTypes().then(function (data) {
    res.json(data);
  });
});

app.post('/addRest/', function(req, res){
  console.log(req.body);
  models.restsTable.createNewRest(req.body.name,req.body.city,req.body.street,req.body.houseNumber,req.body.coordinates, req.body.price,req.body.website,req.body.restTypes, req.body.restOffers).then(function () {
    res.sendStatus(200);
  });
});

app.post('/deleteRest/', function(req, res){
  console.log(req.body.name);
  models.restsTable.deleteRest(req.body.name).then(function () {
    res.sendStatus(200);
   });
});

app.get('/getOffers/', function(req, res){
  models.offersTable.findAllOffers().then(function (data){
    res.json(data);
  });
});

app.get('/getTypes/', function(req, res){
  models.typesTable.findAllTypes().then(function (data){
    res.json(data);
  });
});

app.get('/getAllOffersAndTypes/:name', function(req, res) {
  var rest = req.params['name'];
  models.restsTable.editReturnRestOffersAndTypes(rest).then(function (data){
    console.log(' '+data);
    res.json(data);
  });
});

app.post('/reSaveRest/', function(req,res){
  console.log(req.body);
  models.restsTable.editRest(req.body.restId,req.body.name,req.body.city,req.body.street,req.body.houseNumber,req.body.price,req.body.website,req.body.restTypes, req.body.restOffers).then(function (data){
    res.sendStatus(200);
  });
});

app.get('/adminMenuRestsByCity/', function(req, res){
 /* models.restsTable.findAllRestsByCityGroupBy().then(function (data){
    res.json(data);
  });*/
  models.restsTable.aggregate({ $group : { _id: '$city' , count: { $sum: 1 }}},function (err, result) {
    if (err)
      next(err);
    else {
      res.json(result);
    }
  });
});



module.exports = app;


