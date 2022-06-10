
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
function update_ratings(argument) {
  // body...
}
for (let key in data) {
  let sect = data[key];
  //console.log(sect);
  total=0
  count=0
  for (let rev in sect["reviews"]) {
    let review=sect["reviews"][rev]
    if(!isNaN(review.rating)){
      if(review.rating>=0 && review.rating<=100){
        total+=review.rating
        count++
      }
    }
  }
  if(count>0){
      sect["rating"]=total/count
  }
  else{
    sect["rating"]=0
  }
}

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
      id: data[course].id,
      reviews: data[course].reviews,
      name: data[course].name
    })
  } else {
    next()
  }
})

app.post('/:course',function(req, res){
  var course = req.params.course
  
  if (req.body && req.body.title && req.body.text) {
    data[course].reviews.push({
      title: req.body.title,
      text: req.body.text
    })

    fs.writeFile(
      "./data.json",
      JSON.stringify(data, null, 2),
      function (err) {
        if (!err) {
          res.status(200).send("Success!")
        } else {
          res.status(500).send("Error: error saving review")
        }
      }
    )
  } else {
    res.status(400).send("Error: request body needs a 'title' and 'text'")
  }

  app.get('*', function(req, res){
    res.status(404).render("404");
  })


  /*
  var course = req.params.course

  console.log("post");
  let buffer = "";
  let decoder = new StringDecoder('utf-8');

  let newObject = JSON.parse(buffer);
  data[course].reviews.push(newObject);

  req.on('data', function(data){
    //console.log(data);
    buffer += decoder.write(data);
    //console.log(buffer);
    let newObject = JSON.parse(buffer);
    data[course].reviews.push(newObject);

    jstring = JSON.stringify(data);
    fs.writeFile('./data.json', jstring, err=>{
      if(err){
        console.log(err);
      }else{
        console.log("Success");
      }
    })
  })
  */
})
