const express = require('express');
const app = express();
const port = 80 || process.env.port;
const root = "./";
const request = require('request');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({extended: false});

express.static(root);



app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

app.post('/register', urlencodedParser, (req, res) => {

    let data = {
      "uid": "5af858218e47f44720c4d00",
      "firstName": req.body.firstName,
      "middleInitial": req.body.middleInitial,
      "lastName": req.body.lastName,
      "school": req.body.school,
      "email": req.body.email,
      "mobile": req.body.mobile
    };
    let jsonData = JSON.stringify(data);
    var options = {
      uri: 'http://159.65.135.108/users',
      method: 'POST',
      json: data
    };
    request.post(options, (err, res, body) => {
      if(err){
        if(err.code === 'ECONNREFUSED'){
          console.log("Coudn't get response from server");
        }
      } else if(res) {
        if(res.statusCode === 200){
          console.log('sakses');
          success();
        } else if(res.statusCode === 500){
          console.log('user already exists');
          fail();
        } else{
          console.log('some error');
        }
      }
    });
    function success(){
      res.render('pages/success');
    }
    function fail(){
      res.render('pages/fail');
    }
});


app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/dashboard', (req, res) => {
  res.render('pages/dashboard');
});

app.listen(port, () => {
  console.log("Server is running on " + port);
})