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

// Chat container display
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === '/dashboard') {
      var socket =  io('/user-namespace');
      const startChatHeading = document.querySelector('.start-head');
      const chatSection = document.querySelector('.chat-section');
      const userListItems = document.querySelectorAll('.user-list');
      const chatContainer = document.querySelector('#chat-container');
  
      userListItems.forEach(function(userItem) {
        userItem.addEventListener('click', function() {
          startChatHeading.style.display = 'none';
          chatSection.style.display = 'block';
          const userName = userItem.querySelector('strong').nextSibling.textContent.trim();
          chatContainer.innerHTML = `<p>Chatting with: ${userName}</p>`;
        });
      });
    }
  });
  