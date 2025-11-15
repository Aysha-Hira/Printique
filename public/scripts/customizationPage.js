// Toggle second color input for gradient
const messageBox = document.getElementById("messageBox");

const formElement = document.getElementById("customizationForm");
const gradientToggle = document.getElementById("gradient-toggle");
const secondaryColor = document.getElementById("secondary-color");
const preview = document.querySelector(".product-preview");
const color1 = document.getElementById("color");
const color2 = document.getElementById("color2");

// Toggle secondary color input visibility
gradientToggle.addEventListener("change", () => {
  if (gradientToggle.checked) {
    secondaryColor.style.display = "block";
    updatePreview();
  } else {
    secondaryColor.style.display = "none";
    updatePreview();
  }
});

// Update preview on color change
color1.addEventListener("input", updatePreview);
color2.addEventListener("input", updatePreview);

const previewBox = document.querySelector(".color-preview-box");

function updatePreview() {
  if (gradientToggle.checked) {
    previewBox.style.background = `linear-gradient(135deg, ${color1.value}, ${color2.value})`;
  } else {
    previewBox.style.background = color1.value;
  }
}

// Reset preview
formElement.addEventListener("reset", () => {
  setTimeout(() => {
    color1.value = `#fff`;
    secondaryColor.style.display = "none";
    previewBox.style.background = "#f4f4f4";
  }, 100);
});

const url = window.location.pathname;
const pathParts = url.split("/");

const type = document.getElementById("type");
type.value = pathParts[pathParts.length - 1];


document.getElementById("save").addEventListener("click", (e) => {
  e.preventDefault();

  const formData = new FormData(formElement);

  fetch("/designs/save", {
    method: "POST",
    body: formData,
  })
    .then(async (res) => {
      let data;
      try {
        data = await res.json();
      } catch (err) {
        throw new Error("Server did not return JSON (check server errors)");
      }

      if (!res.ok) throw new Error(data.error || "Saving failed");
      return data;
    })
    .then((data) => {
      messageBox.textContent = "Design saved successfully!";
      messageBox.className = "message success";
    })
    .catch((err) => {
      messageBox.textContent = err.message;
      messageBox.className = "message error";
      console.error("Save error:", err);
    });
});