
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
      title: course,
      reviews: data[course].reviews,
      name: data[course].name
    })
  } else {
    next()
  }
})

app.get('*', function(req, res){
  res.status(404).render("404");
})

app.post('/',function(req, res){
  console.log("post");
  let buffer = "";
  let decoder = new StringDecoder('utf-8');

  req.on('data', function(data){
    //console.log(data);
    buffer += decoder.write(data);
    //console.log(buffer);
    let newObject = JSON.parse(buffer);
    data["CS290"].reviews.push(newObject);

    jstring = JSON.stringify(data);
    fs.writeFile('./data.json', jstring, err=>{
      if(err){
        console.log(err);
      }else{
        console.log("Success");
      }
    })
  })

})
