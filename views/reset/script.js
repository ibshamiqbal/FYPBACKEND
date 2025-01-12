document.addEventListener("DOMContentLoaded", function () {
  const resetPasswordButton = document.getElementById("resetPasswordButton");
// Step 1: Get the pathname
const path = window.location.pathname;
console.log("Pathname:", path); // Logs the pathname

// Step 2: Split the pathname into segments
const segments = path.split('/');
console.log("Original Segments:", segments); // Logs the raw segments

// Step 3: Filter out empty strings
const filteredSegments = segments.filter(segment => segment !== '');
console.log("Filtered Segments:", filteredSegments); // Logs segments without empty strings

// Step 4: Extract the token (last segment)
const token = filteredSegments[filteredSegments.length - 1];
console.log("Extracted Token:", token); // Logs the extracted token
  
  resetPasswordButton.addEventListener("click", async function (event) {
    event.preventDefault();

    
    if (!token) {
      alert("Token is missing");
      return;
    }

    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector(
      'input[name="confirmPassword"]'
    ).value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(`/auth/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, confirmPassword, token }),
    });

    if (response.ok) {
      // Handle success
      alert("Password reset successfully");
    } else {
      // Handle error
      const errorData = await response.json();
      alert("Error: " + errorData.message);
    }
  });
});
