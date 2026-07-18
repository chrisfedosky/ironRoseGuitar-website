document.addEventListener('DOMContentLoaded', () => {
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
});

function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length > 10) {
        value = value.slice(0, 10); // Limit to 10 digits
    }
    if (value.length === 3) {
        value = value + '-';
    } else if (value.length === 6) {
        value = value.slice(0, 3) + '(' + value.slice(3) + '-';
    } else if (value.length === 10) {
        value = value.slice(0, 3) + '(' + value.slice(3, 6) + '-' + value.slice(6) + ')';
    }
    input.value = value;
}

function validatePhoneNumber(input) {
    const value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    return value.length === 10; // Check if the phone number has exactly 10 digits
}
