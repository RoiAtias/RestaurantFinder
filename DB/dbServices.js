/**
 * Created by roi on 1/02/2016.
 */

//contain DB operation: insert, delete, find, replace
var models = require('../DB/models')
var mongoose = require('mongoose');


initDB();
function initDB(){
    var initAdmins = require('./initializationDB/initAdmin');
    var initOffers = require('./initializationDB/InitOffers');
    var initTypes = require('./initializationDB/InitTypes');
    var initRests = require('./initializationDB/InitRests');

    var adminsTable = models.adminsTable;
    var offersTable = models.offersTable;
    var TypesTable = models.typesTable;
    var restsTable = models.restsTable;

    models.adminsTable.count(function(err,count){
      if(!err && count==0){
          console.log("admins table is empty");
          adminsTable.collection.insert(initAdmins);
      }else {
          console.log("admin table already with data");
      }
    });

    models.offersTable.count(function(err, count){
        if(!err && count==0){
            console.log("restOffers table is empty - insert init data from json");
            offersTable.collection.insert(initOffers);
        }else {
            console.log("restOffers table already with data");
        }
    });

    models.typesTable.count(function(err, count){
        if(!err && count==0){
            console.log("lessons table is empty - insert init data from json");
            TypesTable.collection.insert(initTypes);
        }else {
            console.log("lessons table already with data");
        }
    });

    models.restsTable.count(function(err, count){
        if(!err && count==0){
            console.log("rests table is empty - insert init data from json");
            restsTable.collection.insert(initRests);
        }else {
            console.log("rests table already with data");
        }
    });
}

// ----------- Create Functions ----------- //
models.restsTable.createNewRest = function(name, city, street, houseNumber, coordinates, price, website, types, offers){
    var rest = new models.restsTable({
        name: name,
        city: city,
        street: street,
        houseNumber: houseNumber,
        coordinates: coordinates,
        price: price,
        website: website,
        restTypes: [types[0],types[1],types[2], types[3], types[4], types[5], types[6], types[7]],
        restOffers: [offers[0],offers[1],offers[2], offers[3], offers[4], offers[5], offers[6]]
    });
    rest.save(function(err){
        if(!err)
            console.log("saved successfully");
        else console.log(err);
    });
}

// ----------- Admin ----------- //
models.adminsTable.loginAdmin =  function(email, password) {
    var query  = models.adminsTable.findOne({ email: email, password: password},function (err) {
        if (err)
            console.log(err);
    });
    return query.exec(function (err, admin) {
        return admin;
    });
}

// ------- Delete functions -------//
models.restsTable.deleteRest = function(name){
    models.restsTable.remove({name: name}, function (err) {
        if (!err) {
            console.log("rest remove successfully or if doesn't exist doesn't remove anything");
        }else console.log(err);
    });
}

// ------ Edit functions -------//
models.restsTable.editRest = function (restid, name, city, street, houseNumber, price, website, types, offers) {
    models.restsTable.update({_id: restid}, {$set: {name:name,city:city,street:street,houseNumber:houseNumber,price:price,website:website,restTypes:types,restOffers:offers} ,$inc: {__v: 1}},  function (err){
        console.log("error: " + err);
    });
}

models.restsTable.editReturnRestOffersAndTypes =function(name){
    var query =  models.restsTable.find({name:name })
        .populate('restTypes', 'name').populate('restOffers','name');
    return query.exec(function(err, rests){
        return JSON.stringify(rests);
    });
}

// -------------  SEARCH FUNCTIONS ------------- //
models.restsTable.findRest =function(name, city){
    var query =  models.restsTable.find({name:name, city:city})
        .populate('restTypes', 'name').populate('restOffers','name');
    return query.exec(function(err, rests){
        console.log(rests);
        return JSON.stringify(rests);
    });
}

models.restsTable.findAllRestsInCity =function(city){
    var query =  models.restsTable.find({city:city })
    .populate('restTypes', 'name').populate('restOffers','name');
    return query.exec(function(err, rests){
        console.log(rests);
        return JSON.stringify(rests);
    });
}

models.restsTable.findAllRests = function() {
    var query  = models.restsTable.find({},function (err) {
        if (err)
            console.log(err);
    });
    return query.exec(function (err,rests) {
        console.log(rests);
        return JSON.stringify(rests);
    });
}

models.restsTable.findAllRestsByName =function(name){
    var query =  models.restsTable.find({name:name })
        .populate('restTypes', 'name').populate('restOffers','name');
    return query.exec(function(err, rests){
        console.log(rests);
        return JSON.stringify(rests);
    });
}

models.restsTable.findAllRestsByTypes = function(type, callback) {
    models.typesTable.findOne({name: type}, function(err, types) {
        if(err) {
            console.log(err);
        }else {
            if(!restType)
            {
                callback(null);
            }else {
            var query = models.restsTable.find({ restTypes: restType["_id"] }).populate('restTypes', 'name')
                .populate('restOffers','name');
            return query.exec(function(err,rests){
                    callback(rests);
                })
        }}
    })
}

models.restsTable.findRestByNameCityType = function(name, city, type, callback) {
    models.typesTable.findOne({name: type}, function(err, type) {
        if(err) {
            console.log(err);
        }else {
            if(!type)
            {
                callback(null);
            }else {
            var query = models.restsTable.find({ restTypes: type["_id"], name:name, city: city }).populate('restTypes', 'name')
                .populate('restOffers','name');
            return query.exec(function(err,rests){
                callback(rests);
            })
        }}
    })
}

models.restsTable.findRestByNameType = function(name, type, callback) {
    models.typesTable.findOne({name: type}, function(err, type) {
        if(err) {
            console.log(err);
        }else {
            if(!type)
            {
                callback(null);
            }else {
                if(!type)
                {
                    callback(null);
                }else {
            var query = models.restsTable.find({ restTypes: type["_id"], name:name }).populate('restTypes', 'name')
                .populate('restOffers','name');
            return query.exec(function(err,rests){
                callback(rests);
            })
        }}
        }
    })
}

models.restsTable.findRestByCityType = function(city, type, callback) {
    models.typesTable.findOne({name: type}, function(err, type) {
        if(err) {
            console.log(err);
        }else {
            if(!type)
            {
                callback(null);
            }else {
            var query = models.restsTable.find({ restTypes: type["_id"], city:city }).populate('restTypes', 'name')
                .populate('restOffers','name');
            return query.exec(function(err,rests){
                callback(rests);
            })
        }
        }
    })
}

models.typesTable.findAllTypes = function() {
    var query  = models.typesTable.find({},function (err) {
        if (err)
            console.log(err);
    });
    return query.exec(function (err, types) {
        return JSON.stringify(types);
    });
}


models.offersTable.findAllOffers = function() {
    var query  = models.offersTable.find({},function (err) {
        if (err)
            console.log(err);
    });
    return query.exec(function (err, offers) {
        return JSON.stringify(offers);
    });
}


models.restsTable.findAllRestsByCityGroupBy = function() {
    var query  = models.restsTable.aggregate([{ $group : { _id: '$city' , count: { $sum: 1 }}}],function (err, result) {
        if (err) {
            console.log(err);
            next(err);
        }else {
            console.log(result);
            return JSON.stringify(result);
        }
    });
}
