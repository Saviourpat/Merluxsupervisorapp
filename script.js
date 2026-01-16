const form = document.querySelector("form");
const successMessage = document.getElementById("successMessage");
const backToTop = document.getElementById("backToTop");

// Submit form via Formspree
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

// Show/hide back to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) backToTop.style.display = "block";
  else backToTop.style.display = "none";
});

// Scroll to top on click
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// PWA service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.log('Service Worker failed', err));
  });
}
