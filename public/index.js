var classesList = Array.from(document.querySelectorAll('.class-element'))

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

  var slider = document.getElementById("rating")
  if (slider) {
    slider.addEventListener('input', function() {
      console.log(slider.value)
      var review_rating = slider.value
      document.getElementById("rating-label").innerHTML = "Overall: " + review_rating + "%"
    });
  }
});