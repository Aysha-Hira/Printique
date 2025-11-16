document.addEventListener("DOMContentLoaded", () => {
  const url = window.location.pathname;
  const pathParts = url.split("/");
  let userName = pathParts[2];

  const form = document.getElementById("cardForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent actual form submission

    showPopup("✅ Payment successful!", "#28a745", "white");

    setTimeout(() => (window.location.href = `/home/${userName}`), 1500);
  });

  form.addEventListener("reset", (e) => {
    e.preventDefault();
    form.reset();
    setTimeout(() => (window.location.href = `/home/${userName}`), 1500);
  });
});

function showPopup(message, bgColor = "#000", textColor = "#fff") {
  const popup = document.getElementById("popup");

  popup.textContent = message;
  popup.style.background = bgColor;
  popup.style.color = textColor;
  popup.style.display = "block";

  setTimeout(() => (popup.style.display = "none"), 1500);
}
