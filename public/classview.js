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
  var review_rating = "100"
  var review_title = document.getElementById("review-title-input").value

  if(review_text == "" || review_title == ""){
    alert("please dont leave a text field empty")
  }else{
    insertreview(review_title, review_rating, review_text)
    document.getElementById("review-text-input").value = ""
    document.getElementById("review-title-input").value = ""

    loadServer(review_title, review_text)
    hide_modal()
  }
}

function loadServer(title ,text, ){
  console.log("TEST")
  payload = { title : title,
              text : text };

  let xhr = new XMLHttpRequest();
  xhr.open('POST','/');
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