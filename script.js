const form = document.querySelector("form");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch(form.action, {
    method: form.method,
    body: formData,
    headers: { Accept: "application/json" }
  });

  if (response.ok) {
    successMessage.classList.remove("hidden");
    form.reset();
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 4000);
  } else {
    alert("Submission failed. Please try again.");
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