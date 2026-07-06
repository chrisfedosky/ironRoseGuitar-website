/* ============================================================
   form.js — contact form validation
   Validates before Netlify receives the POST.
   Only used on contact.html — loaded after nav.js.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bookingForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Append the 'form-name' value manually
    const formData = new FormData(form);
    formData.append('form-name', 'booking');

    // Encode the payload
    const payload = new URLSearchParams(formData).toString();

    // Send the data via fetch
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload
    })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Clear form inputs
            form.reset();

            // Show success message
            alert('Thank you for your submission! We will get back to you soon.');
          } else {
            // Handle error
            alert('There was an error submitting your form. Please try again later.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('There was an error submitting your form. Please try again later.');
        });
  });
});
