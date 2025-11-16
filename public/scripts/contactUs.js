const form = document.getElementById("form");
const popup = document.getElementById("popup");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const body = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/about-us/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    console.log(result);

    if (res.ok) {
      showPopup("✅ Message sent successfully!", "#28a745", "white");
      form.reset();
    } else {
      showPopup(result.msg || "An unknown error occurred.", "red", "white");
    }
  } catch (err) {
    console.error("Submit error:", err);
    showPopup("An unknown error occurred.", "red", "white");
  }
});

function showPopup(message, bgColor = "#000", textColor = "#fff") {
  popup.textContent = message;
  popup.style.background = bgColor;
  popup.style.color = textColor;
  popup.style.display = "block";

  setTimeout(() => (popup.style.display = "none"), 3000);
}
