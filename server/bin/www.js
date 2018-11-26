var express = require('express');
const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var cors = require('cors');
var mongoUSER = 'mongodb://surajdpatel:HELLObaby123@ds117590.mlab.com:17590/shopping_app'

app.use(cors());
app.use(bodyParser.json());

// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers',  "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

// app.use(cors());
// app.use(bodyParser.json());

mongoose.Promise = bluebird;
mongoose.connect(mongoUSER, { useNewUrlParser: true})
.then(()=> { console.log(`Succesfully Connected to the Mongodb`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb`)});

var indexRouter = require('../routes/index');
app.use('', indexRouter);

var usersRouter = require('../routes/users');
app.use('/users', usersRouter);

var productsRouter = require('../routes/products');
app.use('/products', productsRouter);

app.listen(port, () => {
  console.log('server is listening on port:' + port + '')
});

//       function normalizePort(val) {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }