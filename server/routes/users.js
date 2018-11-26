var express = require('express');
var router = express.Router();
var Users = require('../bin/schemas');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const SCHEMA = Users.userschema;

// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/addUsers', (req, res) => {
  console.log('hjhjhjh' , req.body);
  const userValidate = validateUsers(req.body);
  console.log("userValidate.error",userValidate);
  if (userValidate.error != null) {
    res.json({
      success: false,
      message: userValidate.error.details[0].message
    });
  } else {
    bcrypt.hash(req.body.password, 10).then(hash => {
      console.log("hash = ",hash)
      console.log("schema = ",SCHEMA)
      const login_obj = new SCHEMA({
        username: req.body.username,
        password: hash
      });
      console.log("login_obj = ",login_obj)
      login_obj.save().then(result => {
        res.json({
          message: "User created",
          data: result,
          status: 200
        });
      }).catch(err => {
        res.json({
          message: "Duplicate Entry",
          error: err,
          status: 400
        });
      });
    });
  }
});

function validateUsers(credentials) {
  const UsersValidation = {
    username: Joi.string().required().min(3),
    password: Joi.string().required()
  }
  const validate_joi = Joi.validate(credentials, UsersValidation);
  console.log("validate_joi",validate_joi);
  return validate_joi;
}

module.exports = router;
// const courseSchema = new mongoose.Schema({
//   name: String,
//   author: String,
//   tags: [String],
//   date: {type: Date,default: Date.now},
//   isPublished: Boolean
// });

// // createCourse();
// async function getCourses() {
//   const getcourse = await Course.find({isPublished:true})  
//   .limit(10)
//   .sort({name:1})
//   .select({name:1,tags:1}); 
//   console.log("getcourses = ", getcourse);
// }

// // getCourses();
// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if(!course) return;
//   course.isPublished = false;
//   course.author = 'Amitabh Bachchan';

//   const result = await course.save();
//   console.log("result  = ", result)

// }
// updateCourse('5bd0b2f4a4dca220106bfe5e');