
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

var reviewData = require('./reviewData.json');

var path = require('path');

const StringDecoder = require('string_decoder').StringDecoder;

app.get('/', function (req, res) {
  res.status(200).render("classview", {
    title: "reviewer",
    reviews: reviewData
  });



});

app.use(express.static('public'));

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});

app.post('/',function(req, res){
  let buffer = "";
  let decoder = new StringDecoder('utf-8');

  req.on('data', function(data){
    //console.log(data);
    buffer += decoder.write(data);
    //console.log(buffer);
    let newObject = JSON.parse(buffer);
    reviewData.push(newObject);

    jstring = JSON.stringify(reviewData);
    fs.writeFile('./reviewData.json',jstring, err=>{
      if(err){
        console.log(err);
      }else{
        console.log("Success");
      }

    });
  });
});
