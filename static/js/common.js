// Description: Common functions for all pages
function loadComponent(url, elementId, callback) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      if (callback) callback();
    })
    .catch((error) => console.error(`Error loading ${url}:`, error));
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("/header", "header-container");
  loadComponent("/slider", "slider-container", initSlider);
});

// Slider background
function initSlider() {
  let items = document.querySelectorAll(".slider .list .item");
  let countItem = items.length;
  let itemActive = 0;

  function showSlider() {
    itemActive = (itemActive + 1) % countItem;
    let itemActiveOld = document.querySelector(".slider .list .item.active");
    itemActiveOld.classList.remove("active");
    items[itemActive].classList.add("active");
  }

  setInterval(showSlider, 8000);
}

// Toggle password visibility
document.addEventListener('click', function(e) {
  if (e.target.id === 'toggleIcon') {
    const targetId = e.target.getAttribute('data-target');
    const passwordInput = document.getElementById(targetId);
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    e.target.classList.toggle('fa-eye');
    e.target.classList.toggle('fa-eye-slash');
  }
}); 