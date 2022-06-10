var classesList = Array.from(document.querySelectorAll('.class'))

function createreview(){
  var review_text = document.getElementById("review-text-input").value
  var review_rating = "100"
  var review_title = document.getElementById("review-title-input").value
  var course = document.getElementById("name").textContent

  console.log(course)

  if(review_text == "" || review_title == ""){
    alert("please dont leave a text field empty")
  }else{
    insertreview(review_title, review_rating, review_text)
    document.getElementById("review-text-input").value = ""
    document.getElementById("review-title-input").value = ""

    loadServer(review_title, review_text, course)
    hide_modal()
  }
}

function loadServer(title ,text, course){
  console.log("TEST")
  payload = { title : title,
              text : text };

  let xhr = new XMLHttpRequest();
  xhr.open('POST','/' + course);
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


window.addEventListener('DOMContentLoaded', function () {
  var searchButton = document.getElementById('navbar-search-button');
  if (searchButton) {
    searchButton.addEventListener('click', searchClasses);
  }
  var searchInput = document.getElementById('navbar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', searchClasses);
  }
  var modalCancalButton = document.querySelector('#add-review-modal .modal-cancel-button');
  if (modalCancalButton) {
    modalCancalButton.addEventListener('click', hide_modal);
  }
  var modalAcceptButton = document.querySelector('#add-review-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', createreview);
  }
});
