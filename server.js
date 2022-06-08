
var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
var fs = require('fs')

var app = express()
app.use(express.static('public'))
app.use(express.json())

var port = process.env.PORT || 3000

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

var data = require('./data.json')

const StringDecoder = require('string_decoder').StringDecoder
const { nextTick } = require('process')

app.listen(port, function () {
  console.log("== Server is listening on port", port)
})

app.get('/', function (req, res) {
  res.status(200).render("classlist", {
    show_navbar: true,
    title: "reviewer",
    classes: data
  });
})

app.get('/:course', function (req, res, next) {
  var course = req.params.course

  if (course in data){
    res.status(200).render("classview", {
      show_navbar: false,
      title: "CS290",
      reviews: data[course].reviews
    })
  } else {
    next()
  }
})

app.get('*', function(req, res){
  res.status(404).render("404");
})

app.post('/',function(req, res){
  let buffer = "";
  let decoder = new StringDecoder('utf-8');

  req.on('data', function(data){
    //console.log(data);
    buffer += decoder.write(data);
    //console.log(buffer);
    let newObject = JSON.parse(buffer);
    data.push(newObject);

    jstring = JSON.stringify(data);
    fs.writeFile('./reviewData.json',jstring, err=>{
      if(err){
        console.log(err);
      }else{
        console.log("Success");
      }

    })
  })

})
