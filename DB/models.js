/**
 * Created by roi on 1/02/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//data base schemas
var typesSchema = new Schema({
    name: { type: String, index: true }
});

var offersSchema = new Schema({
    name: { type: String, index: true }
});

var restSchema = new Schema({
    name: { type: String, index: true },
    city: String,
    street: String,
    houseNumber: String,
    price: Number,
    website: String,
    coordinates: String,
    restTypes: [ {type: Schema.Types.ObjectId, ref: 'restType'}],
    restOffers: [{ type: Schema.Types.ObjectId, ref: 'restOffers'}]
});

var adminSchema = new Schema({
    email:  { type: String, index: true },
    password: String
});

module.exports.adminsTable = mongoose.model('admins',adminSchema);
module.exports.restsTable = mongoose.model('rests',restSchema);
module.exports.offersTable = mongoose.model('restOffers',offersSchema);
module.exports.typesTable = mongoose.model('restType',typesSchema);



