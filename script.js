const form = document.querySelector("form");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      // Show the success pop-up in the middle of the screen
      successMessage.classList.remove("hidden");

      // Reset the form
      form.reset();

      // Hide the success message after 5 seconds (5000ms)
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 5000);
    } else {
      alert("Submission failed. Please try again.");
    }
  } catch (err) {
    console.error("Form submission error:", err);
    alert("Error submitting form. Check your connection.");
  }
});

// --- REGISTER SERVICE WORKER FOR PWA ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.log('Service Worker failed', err));
  });
}
