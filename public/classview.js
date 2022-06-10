function insertreview(title, rating, text) {
  var context = { title: title, rating: rating, text: text };
  var review = Handlebars.templates.review(context);
  var container = document.getElementsByClassName("review-container");
  container[0].insertAdjacentHTML("beforeend", review);
}
function show_modal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  var createTwitModal = document.getElementById('add-review-modal');

  modalBackdrop.classList.remove('hidden');
  createTwitModal.classList.remove('hidden');
}
function hide_modal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  var createTwitModal = document.getElementById('add-review-modal');

  modalBackdrop.classList.add('hidden');
  createTwitModal.classList.add('hidden');
  document.getElementById("review-text-input").value = ""
  document.getElementById("review-title-input").value = ""
}

function createreview(){
  var review_text = document.getElementById("review-text-input").value
  var review_rating = document.getElementById("review-score-input").value
  var review_title = document.getElementById("review-title-input").value
  var course = document.getElementById("name").textContent

  review_score = parseInt(review_rating)

  if(review_text == "" || review_title == ""){
    alert("Please dont leave a field empty!")
  }else{
    insertreview(review_title, review_score, review_text)
    document.getElementById("review-text-input").value = ""
    document.getElementById("review-title-input").value = ""

    loadServer(review_title, review_text, review_score, course)
    hide_modal()
  }
}

function loadServer(title ,text, rating ,course){
  payload = { title : title,
              text : text,
              rating: rating
            };

  let xhr = new XMLHttpRequest();
  xhr.open('POST','/' + course);
  xhr.setRequestHeader('Content-Type','application/json');
  console.log(payload);
  payloadjson = JSON.stringify(payload);
  console.log(payloadjson);
  xhr.send(payloadjson);
}
window.addEventListener('DOMContentLoaded', function () {
  var modalCancalButton = document.querySelector('#add-review-modal .modal-cancel-button');
  if (modalCancalButton) {
    modalCancalButton.addEventListener('click', hide_modal);
  }
  var modalAcceptButton = document.querySelector('#add-review-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', createreview);
  }
});

fetch(window.location.href+'/data.json').then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  var trace = {
      x: data,
      type: 'histogram',
    };
  var data = [trace];
  var layout = {
    title: "Review scores",
    bargap: 0.05,
  };
  Plotly.newPlot('plot', data, layout, {staticPlot: true});



  console.log(data);
}).catch(err => {
  // Do something for an error here
});
