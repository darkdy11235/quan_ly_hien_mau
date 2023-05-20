const form = document.getElementById('loginForm');
console.log('form');
form.addEventListener('submit', async (event) => {
event.preventDefault(); // Prevent the form from submitting normally

const formData = new FormData(form); // Create a FormData object from the form

try {
    const response = await fetch('/api/v1/nguoi_dung/login', {
    method: 'POST',
    body: formData,
    });
    console.log(response);

    if (response.ok) {
    console.log('Login successful');
    } else {
    // Handle error, e.g., display an error message
    const errorMessage = 'An error occurred during login.';
    console.error(errorMessage);
    // Display the error message in the UI or perform any other error handling logic
    }
} catch (error) {
    // Handle network or other errors
    console.error(error);
    // Display an error message or perform any other error handling logic
}
});