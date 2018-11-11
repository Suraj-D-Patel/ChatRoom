var express = require('express');
var app = express();
var port = parseInt(process.env.PORT, 10) || 5000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

mongoose.Promise = bluebird;
mongoose.connect('mongodb://127.0.0.1:27017/trading', { useNewUrlParser: true})
.then(()=> { console.log(`Succesfully Connected to the Mongodb`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb`)});

var indexRouter = require('./routes/index');
app.use('', indexRouter);

var usersRouter = require('./routes/users');
app.use('/users', usersRouter);

var server = app.listen(port, () => {
  console.log('server is listening on port:' + port + '')
});
var io = require('socket.io').listen(server);

io.on('connection', (socket)=>{
    // console.log("new connection made ::::: ");
    socket.on('join',(data) => {
      // console.log("data = ",data);
      socket.join(data.room);
      // console.log(data.user , " joined the room :::: ",data.room);
      socket.broadcast.to(data.room).emit('New User Joined' , {user: data.user,message:'has joined this room'});
    });

    socket.on('leave', (data) => {
      socket.broadcast.to(data.room).emit('user left' , {user:data.user,message:'has left the room'});
      socket.leave(data.room);
    });

    socket.on('message', (data) => {
      socket.in(data.room).emit('new message' , {user:data.user,message:data.message});
    });
});