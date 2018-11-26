var express = require('express');
var router = express.Router();
var Collection = require('../bin/schemas');
const Joi = require('joi'); 
const Schema_Model = Collection.productschema;

router.post('/addProducts', (req, res) => {
  console.log('addProducts' , req.body);
  const product_obj = new Schema_Model({
    title: req.body.title,
    content: req.body.desc,
    // createdBy: 'todo', 
    // inStock: true,
    photo: req.body.images,
    price: req.body.price,
    // rating: 0,
  });
  product_obj.save().then(result => {
    res.json({
      message: "Product ADDED successfully",
      data: result,
      status: 200
    });
  }).catch(err => {
    console.log("error = ",err)
    res.json({
      message: "Cannot Save Product, An Error Occured",
      error: err,
      status: 400
    });
  });
});

router.get('/get_all_products',(req,res) => {
  console.log("get in to products");
  async function getProducts() {
    const getProduct_result = await Schema_Model.find({},(err,result) => {
      if (err) throw err;
      console.log(result.name);
    }).then(result => {
      res.json({
        message: 'Products Fetched Successfully',
        result : result,
        status:200
      });
    }).catch(error => {
      res.json({
        message: 'Failed to Fetch Products',
        result : error
      })
    });
    console.log("getProducts = ", getProduct_result);
}

getProducts();
});

router.get('/get_product/:id', (req,res) => {
  async function getProduct_withID() {
    const get_product = await Schema_Model.find({_id:req.params.id}
      // ,(err,result) => {
      // if (err) throw err;
      // console.log(result.name);
    // }
    ).then(result => {
      res.json({
        message: 'Product Fetched Successfully',
        result : result,
        status:200
      });
    }).catch(error => {
      res.json({
        message: 'Failed to Fetch Product',
        result : error
      })
    });
    console.log("getProducts = ", get_product);
}
getProduct_withID();
});

module.exports = router;