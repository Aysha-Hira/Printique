const container = document.getElementById("container-product");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

let selectedDesigns = [];

// Popup modal elements
const modal = document.getElementById("checkout-modal");
const checkoutList = document.getElementById("checkout-list");
const closeBtn = document.querySelector(".close-btn");

// Fetch designs
// document.addEventListener("DOMContentLoaded", () => {
const url = window.location.pathname;
const pathParts = url.split("/");

let userName = "Guest";
if (pathParts.length > 2) 
  userName = pathParts[pathParts.length - 1];

if ((userName == "Guest")) {
  container.innerHTML = "<p class='text-center'>No designs saved yet. Please login to save designs</p> <button href='/login'>Login</button>";
  return;
}
fetch(`/designs/list/${userName}`)
  .then((res) => res.json())
  .then((designs) => {
    if (!designs.length) {
      container.innerHTML = "<p class='text-center'>No designs saved yet.</p>";
      return;
    }

    designs.forEach((design) => {
      const {
        title,
        product_type,
        length,
        width,
        height,
        color_1,
        color_2,
        imageUrl,
        price = 20,
      } = design;

      const card = document.createElement("div");
      card.className = "card m-3 shadow-sm position-relative";
      card.style.width = "18rem";
      card.style.cursor = "pointer";

      // Only show product info, no badge or button
      card.innerHTML = `
        <img src="${
          imageUrl ||
          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        }"
             class="card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            Type: ${product_type}<br>
            Dimensions: ${length} x ${width} x ${height} cm<br>
            Colors: ${color_1}${color_2 ? ", " + color_2 : ""}<br>
            Price: $${price.toFixed(2)}
          </p>
        </div>
      `;

      container.appendChild(card);

      // CLICK CARD TO SELECT
      card.addEventListener("click", () => {
        const exists = selectedDesigns.find((d) => d.title === title);

        if (exists) {
          // Unselect
          selectedDesigns = selectedDesigns.filter((d) => d.title !== title);
          card.style.border = "";
        } else {
          // Select
          selectedDesigns.push({ title, price });
          card.style.border = "2px solid #28a745"; // green border on selection
        }

        // Update total
        const total = selectedDesigns.reduce((sum, d) => sum + d.price, 0);
        totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
        checkoutBtn.disabled = selectedDesigns.length === 0;
      });
    });
  });

// OPEN CHECKOUT POPUP
checkoutBtn.addEventListener("click", () => {
  checkoutList.innerHTML = selectedDesigns
    .map(
      (d) => `
      <li class="list-group-item d-flex justify-content-between">
        ${d.title} <span>$${d.price.toFixed(2)}</span>
      </li>`
    )
    .join("");

  modal.classList.remove("hidden");
});

// CLOSE POPUP
closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

// CONFIRM PURCHASE
document.getElementById("confirm-btn").addEventListener("click", () => {
  // Reset UI
  selectedDesigns = [];
  document.querySelectorAll(".card").forEach((c) => {
    c.style.border = "";
  });

  const totalPriceToSend = totalPriceEl.textContent;
  totalPriceEl.textContent = "Total: $0.00";
  checkoutBtn.disabled = true;
  modal.classList.add("hidden");

  window.location.href = "/";
});
