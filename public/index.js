var classesList = Array.from(document.querySelectorAll('.class'))

function insertreview(author, text) {
  var context = { author: author, text: text };
  var review = Handlebars.templates.review(context);
  var container = document.getElementsByClassName("review-container");
  container[0].insertAdjacentHTML("beforeend", review);
}


window.addEventListener('DOMContentLoaded', function () {

});

function createreview(){

  var review_text = document.getElementById("review-text").value
  var review_author = document.getElementById("review-author").value

  if(review_text == "" || review_author == ""){
    alert("please dont leave a text field empty")
  }else{
    insertreview(review_author, review_text)
    document.getElementById("review-text").value = ""
    document.getElementById("review-author").value = ""

    loadServer(review_author, review_text)

    //const newReview = {
      //title: "The title of the review",
      //text: "Text to be formatted into a review the same way we did in assignment 5."
    //};


    //const jsonString = JSON.stringify(newReview);

    //fs.writeFile('./reviewData.json', jsonString , err => {
    //   if(err){
      //   console.log("Error");
      // } else {
        //  console.log("Success");
      // }
    //});
  }

}

function loadServer(author ,text, ){
  console.log("TEST")
  payload = { author : author,
              text : text };

  let xhr = new XMLHttpRequest();
  xhr.open('POST','/');
  xhr.setRequestHeader('Content-Type','application/json');
  console.log(payload);
  payloadjson = JSON.stringify(payload);
  console.log(payloadjson);
  xhr.send(payloadjson);
}


function searchClasses() {
  //get the search bar input
  var keyWords = document.getElementById('navbar-search-input').value.toLowerCase()

  //delete all the twits from the DOM
  while (document.querySelector('.class-container').lastChild) {
      document.querySelector('.class-container').removeChild(document.querySelector('.class-container').lastChild)
  }

  //only show the twits from the twit array that contain the search bar input
  for (var course of classesList) {
      if (course.textContent.toLowerCase().includes(keyWords)) {
          document.querySelector('.class-container').appendChild(course)
      }
  }
}

document.getElementById('navbar-search-button').addEventListener('click', searchClasses)
document.getElementById('navbar-search-input').addEventListener('input', searchClasses)