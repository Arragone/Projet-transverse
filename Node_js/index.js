const express = require('express')
const app = express()

const mysql = require('mysql');

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let con = mysql.createConnection({
  host: "10.25.10.21",
  user: "g3",
  password: "UZmc6FpCXsTdpXTu",
  database: "g3"
});

con.connect(function(err) {
  if (err) throw err;
    console.log('Connected!');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
  next();
  });

app.get('/', function (req, res) {
  res.send('Hello World, Nice !')
  })

app.get('/allGames', function (req, res) {
  con.query('SELECT * FROM Game',(err,results) => {
    if(err) throw err;
      res.json(results);
    });
})

app.get('/allLevel', function (req, res) {
  con.query('SELECT * FROM Level',(err,results) => {
    if(err) throw err;
      res.json(results);
    });
})


app.listen(3000, function () {
  console.log('App listening on port 3000! ')
})

const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = socketIO(server)
io.on('connection', socket => {
console.log('New client connected')
socket.on('new-message', (message) => { //event
io.emit('message', {text: message}); // broadcast
console.log(message);});
socket.on('disconnect', () => {
console.log('user disconnected') })});
server.listen(3000, function () {
console.log('app listening on port 3000! ')})
