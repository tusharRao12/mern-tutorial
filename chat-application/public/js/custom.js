// Nav toggle
document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.querySelector("#menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function() {
      navLinks.classList.toggle("active");
    });
  }
});


// Confirm Password
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                e.preventDefault();
                document.getElementById('confirmPasswordError').textContent = "Passwords do not match!";
            }
        });
    }
});


$(document).ready(function() {
  if (window.location.pathname === '/dashboard') {
    alert('Hello, you are on the Dashboard route!');
  }
});
