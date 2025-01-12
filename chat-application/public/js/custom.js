document.getElementById('registerForm').addEventListener('submit', function (e) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        e.preventDefault();
        document.getElementById('confirmPasswordError').textContent = "Passwords do not match!";
    }
});