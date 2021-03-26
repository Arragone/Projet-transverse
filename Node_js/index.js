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

app.get('/allPersons', function (req, res) {
  con.query('SELECT * FROM person',(err,results) => {
    if(err) throw err;
      res.json(results);
    });
})

app.get('/person/:id', function (req, res) {
  con.query('select * from person where id=?',[req.params.id],function (err, results) {
    if (err) throw err;
      res.send(results);
    });
});

app.post('/addPerson', function (req, res) {
  var postData = req.body;
  con.query('INSERT INTO person SET ?', postData, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
    });
});

app.post('/updatePerson', function (req, res) {
con.query('UPDATE person SET name=?, lastName=?, age=? where id=?', [req.body.name,req.body.lastName, req.body.age, req.body.id],
function (error, results, fields) {
  if (error) throw error;
    res.send(results);
  });
});

app.delete('/deletePerson', function (req, res) {
console.log(req.body);
con.query('DELETE FROM person WHERE id=?',[req.body.id], function (error, results, fields) {
  if (error) throw error;
    res.send('Record has been deleted!');
  });
});

app.listen(3000, function () {
  console.log('App listening on port 3000! ')
})
