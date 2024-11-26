$(document).ready(function() {
    $('#content').summernote({
      height: 300, 
      placeholder: 'Write your post content here...', 
      tabsize: 2,
    });
  });
  function validationForm() {
    const title = document.getElementById("title").value;
    const content = $('#content').val(); 
    if (!title || !content) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  }