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




//Socket
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname === '/dashboard') {
      var sender_id = document.getElementById('loggedInUserId').value;
      var receiver_id;
      var socket =  io('/user-namespace',{
        auth:{
          token:sender_id
        }
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
  

// Chat container
document.addEventListener('DOMContentLoaded', function() {
  // Modal Elements
  const modal = document.createElement('div');
  modal.classList.add('modal');
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  const closeModal = document.createElement('span');
  closeModal.classList.add('close');
  closeModal.innerHTML = '&times;';
  modalContent.appendChild(closeModal);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Event listener for clicking a user list item
  const userItems = document.querySelectorAll('.user-item');
  userItems.forEach(item => {
    item.addEventListener('click', function() {
      var userId = item.getAttribute('data-id');
      receiver_id = userId;

      const userImage = item.querySelector('.user-avatar').getAttribute('src');
      const userName = item.querySelector('.user-name').innerText;

      const startHead = document.querySelector('.start-head');
      startHead.innerHTML = ''; 

      const headingContainer = document.createElement('div');
      headingContainer.classList.add('heading-container');
  
      const imgElement = document.createElement('img');
      imgElement.src = userImage;
      imgElement.classList.add('heading-avatar');
      headingContainer.appendChild(imgElement);
      
      const nameElement = document.createElement('span');
      nameElement.classList.add('heading-name');
      nameElement.innerText = userName;
      headingContainer.appendChild(nameElement);
      
      startHead.appendChild(headingContainer);

      const chatSection = document.querySelector('.chat-section');
      chatSection.style.display = 'block';

      imgElement.addEventListener('click', function() {
        const modalImage = document.createElement('img');
        modalImage.src = userImage;
        modalImage.classList.add('modal-img');
        modalContent.appendChild(modalImage);

        modal.style.display = 'block';
      });
    });
  });

  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    modalContent.innerHTML = '';
    modalContent.appendChild(closeModal); 
  });

  $('#chat-form').submit(function(event){
    event.preventDefault();

    var message = $('#message').val();

    $.ajax({
      url:'/save-chat',
      type:'POST',
      data:{sender_id:sender_id,receiver_id:receiver_id,message:message},
      success:function(response){
        if(response.success){
            $('#message').val('');
            let chat = response.data.message;
            let html = `
                <div class="current-user-chat">
                  <h5>`+chat+`</h5>
                </div
            `;
            $('#chat-container').append(html);
            socket.emit('newChat',response.data);
        }else{
          alert(data.msg)
        }
      }
    })
  })

});