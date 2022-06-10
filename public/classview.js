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