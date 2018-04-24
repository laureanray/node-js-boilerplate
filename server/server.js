const express = require('express');
const app = express();
const port = 3001 || process.env.port;
const root = "./";
express.static(root);

app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
let year = (new Date()).getFullYear();
console.log(year);
app.get('/', (req, res) => {
    res.render('pages/index', {
      year: year
    });
    

});

app.get('/views/js/libs/jquery-3.3.1.min.js', (req, res) => {
  res.send("../views/js/libs/jquery-3.3.1.min.js");
});
// about page 
app.get('/about', (req, res) => {
    res.render('pages/about');
});


app.listen(port, () => {
  console.log("Server is running on " + port);
})