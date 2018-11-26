const path = require('path');
const fs = require('fs');
var express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();
var router = express.Router();
var path_array = [];

app.use(bodyParser.json());

// const DIR = 'D:/hello/ShoppingApp/server-src/public/images';
const IMG_DIR = path.join(__dirname , '../public/images');

/* GET home page. */

// router.get('/', function (req, res, next) {
//   res.render('index', {title: 'Express'});
// });

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // console.log('jadshkj',__dirname.split(path.sep))
    // const path_resolve = __dirname.split(path.sep);
    // // path_resolve.pop();
    // path_array = path_resolve.pop()
    // const a = path.join(path_array);
    // console.log("A = " , DIR);
    callback(null, IMG_DIR);
  },
  filename: function (req, file, cb) {
    // console.log("file = ", file)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage});

// router.get('/', function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

router.get('/getimages/:image', (req, res) => {
// console.log("getting images" , req.params);
// console.log("getting images anme" , DIR+'/'+req.params.image);
// console.log("get dir" , 'D:/angular/server/public/images'+'/'+req.params.image);
// console.log("get dir wo params" , __dirname);
// console.log("get dir wo params" , __filename);
// fs.createWriteStream(req.params.image);
// fs.createWriteStream(DIR + '/'+req.params.image);
// var address =dfg;

res.sendFile(path.join(IMG_DIR, req.params.image)) ;
// res.sendFile(path.join(__dirname+'../public/images', req.params.image)) ;
// res.sendFile(DIR+'/'+req.params.image);
// console.log("getting images");
});

router.post('/upload_photos', upload.array('file',5), (req, res) => {

    // console.log("hello2 req.files = ", req.files);
    // console.log("hello2 req.body = ", req.body);
    if (req.files.length < 1) {
      //error
      res.json({
        message: "File Upload Error",
        data: null
      });
    } else {
      res.json({
        message: "File Uploaded",
        data: req.files,
        status: 200
      });
    }
  });

//   var photos = [],
//       form = new formidable.IncomingForm();
//   form.multiples = true;
//   form.uploadDir = path.join(__dirname, 'tmp_uploads');
//   form.on('file', function (name, file) {        
//   var buffer = null,
//           type = null,
//           filename = '';
//       buffer = readChunk.sync(file.path, 0, 262);
//       type = fileType(buffer);
//       // Check the file type as it must be either png,jpg or jpeg
//       if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
//           filename = Date.now() + '-' + file.name;
//           fs.rename(file.path, path.join(__dirname, 'uploads/' + filename));
//           photos.push({
//               status: true,
//               filename: filename,
//               type: type.ext,
//               publicPath: 'uploads/' + filename
//           });
//       } else {
//           photos.push({
//               status: false,
//               filename: file.name,
//               message: 'Invalid file type'
//           });
//           fs.unlink(file.path);
//       }
//   });
//   form.on('error', function(err) {
//       console.log('Error occurred during processing - ' + err);
//   });
//   form.on('end', function() {
//       console.log('All the request fields have been processed.');
//   });
//   form.parse(req, function (err, fields, files) {
//       res.status(200).json(photos);
//   });
// });

// app.post('/uploads_hkjl', upload.single('photo'), function (req, res) {
//   upload(req, res, function (err) {
//     //console.log(req.body);
//     //console.log(req.files);
//     if (err) {
//       return res.end("Error uploading file.");
//     }
//     res.end("File is uploaded");
//   });
//   // if (!req.file) {
//   //     console.log("No file received");
//   //     return res.send({
//   //       success: false
//   //     });

//   //   } else {
//   //     console.log('file received');
//   //     return res.send({
//   //       success: true
//   //     })
//   //   }
// });

module.exports = router;