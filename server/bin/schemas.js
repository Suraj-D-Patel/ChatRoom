var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type : String, unique: true},
  password: {type : String},
  date: {type: Date,default: Date.now}
});

var ProductSchema = new Schema({
  title: {type : String},
  content: {type : String},
  // createdBy: {type : String},  ///////mongodb ID type
  // inStock: {type : Boolean},
  photo: {type : Array},
  price: {type : Number},
  // rating: {type : Number},
  product_added_date: {type: Date,default: Date.now}
});

exports.userschema = mongoose.model('Users', UserSchema);
exports.productschema = mongoose.model('Products', ProductSchema);
// const Products = new mongoose.Schema({
//   username: {type : String, unique: true},
//   password: {type : String},
//   date: {type: Date,default: Date.now}
// });
// const Users_TABLE = new mongoose.Schema({
//   username: String,
//   password: String,
//   confpassword: String,
// });
// module.exports = Users;
// module.exports = Products;


// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var ProductSchema = new Schema({
//     title: String,
//     price: Number,
//     instock: Boolean,
//     photo: String,
// });
// module.exports = mongoose.model('Product', ProductSchema);