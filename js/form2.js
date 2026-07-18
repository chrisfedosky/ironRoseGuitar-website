const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');
const phoneInput = form.querySelector('input[name="phone"]');

// Add event listener for phone number input
phoneInput.addEventListener('input', function() {
    formatPhoneNumber(this);
});

// Add event listener for form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "73851e33-fb44-47a8-9bd2-2d33b63f19b9");

    // Validate phone number
    if (!validatePhoneNumber(phoneInput)) {
        alert("Please enter a valid phone number in the format (123) 456-7890.");
        return;
    }

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
