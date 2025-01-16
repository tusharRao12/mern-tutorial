// Wrapper
const wrapper = document.querySelector(".wrapper"),
          signupHeader = document.querySelector(".signup header"),
          loginHeader = document.querySelector(".login header");
        loginHeader.addEventListener("click", () => {
          wrapper.classList.add("active");
        });
        signupHeader.addEventListener("click", () => {
          wrapper.classList.remove("active");
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


// Chat container display and socket
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === '/dashboard') {
      const sender_id = document.getElementById('loggedInUserId').value;
      var socket =  io('/user-namespace',{
        auth:{
          token:sender_id
        }
      });
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

      socket.on('getOnlineUser', function(data) {
        const statusElement = document.getElementById(`${data.user_id}-status`);
        if (statusElement) {
            statusElement.textContent = 'Online';
            statusElement.classList.remove('offline-status');
            statusElement.classList.add('online-status');
        }
      });    
      socket.on('getOfflineUser', function(data) {
        const statusElement = document.getElementById(`${data.user_id}-status`);
        if (statusElement) {
            statusElement.textContent = 'Offline';
            statusElement.classList.remove('online-status');
            statusElement.classList.add('offline-status');
        }
      });    
    }
  });
  