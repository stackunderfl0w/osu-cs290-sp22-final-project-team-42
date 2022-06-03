
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

var path = require('path');

app.get('/', function (req, res) {
  res.status(200).render("classview"); 
});

app.use(express.static('public'));

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
