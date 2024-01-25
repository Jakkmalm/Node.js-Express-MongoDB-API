var mongoose = require('mongoose');

var productsSchema = new mongoose.Schema({
price: String,
color: String,
brand: String,
type: String
},
{
collection: 'products'
});

module.exports = mongoose.model('productsModel', productsSchema);