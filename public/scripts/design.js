// const container = document.getElementById("container-product");

// fetch("/designs/list")
//   .then((res) => res.json())
//   .then((designs) => {
//     if (!designs.length) {
//       container.innerHTML = "<p class='text-center'>No designs saved yet.</p>";
//       return;
//     }

//     designs.forEach((design) => {
//       const {
//         title,
//         product_type,
//         length,
//         width,
//         height,
//         color_1,
//         color_2,
//         imageUrl,
//       } = design;

//       const card = document.createElement("div");
//       card.className = "card m-3 shadow-sm";
//       card.style.width = "18rem";

//       card.innerHTML = `
//         <img src="${
//           imageUrl ||
//           "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
//         }"
//              class="card-img-top" alt="${title}">
//         <div class="card-body">
//           <h5 class="card-title">${title}</h5>
//           <p class="card-text">
//             Type: ${product_type}<br>
//             Dimensions: ${length} x ${width} x ${height} cm<br>
//             Colors: ${color_1}${color_2 ? ", " + color_2 : ""}
//           </p>
//           <button class="btn btn-primary select-btn">Customize</button>
//         </div>
//       `;

//       // Add click event
//       card
//         .querySelector(".select-btn")
//         .addEventListener("click", () => customize(title.replace(/\s+/g, "")));

//       container.appendChild(card);
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//     container.innerHTML =
//       "<p class='text-center text-danger'>Failed to load designs.</p>";
//   });

// const container = document.getElementById("container-product");
// const totalPriceEl = document.getElementById("total-price");
// const checkoutBtn = document.getElementById("checkout-btn");

// let selectedDesigns = [];

// fetch("/designs/list")
//   .then((res) => res.json())
//   .then((designs) => {
//     if (!designs.length) {
//       container.innerHTML = "<p class='text-center'>No designs saved yet.</p>";
//       return;
//     }

//     designs.forEach((design) => {
//       const {
//         title,
//         product_type,
//         length,
//         width,
//         height,
//         color_1,
//         color_2,
//         imageUrl,
//         price = 20, // default price if not provided
//       } = design;

//       const card = document.createElement("div");
//       card.className = "card m-3 shadow-sm";
//       card.style.width = "18rem";

//       card.innerHTML = `
//         <img src="${
//           imageUrl ||
//           "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
//         }" class="card-img-top" alt="${title}">
//         <div class="card-body">
//           <h5 class="card-title">${title}</h5>
//           <p class="card-text">
//             Type: ${product_type}<br>
//             Dimensions: ${length} x ${width} x ${height} cm<br>
//             Colors: ${color_1}${color_2 ? ", " + color_2 : ""}<br>
//             Price: $${price.toFixed(2)}
//           </p>
//           <div class="form-check">
//             <input class="form-check-input select-design" type="checkbox" value="${title}" data-price="${price}" id="check-${title.replace(/\s+/g, "")}">
//             <label class="form-check-label" for="check-${title.replace(/\s+/g, "")}">Select</label>
//           </div>
//         </div>
//       `;

//       container.appendChild(card);
//     });

//     // Handle selection and total price
//     document.querySelectorAll(".select-design").forEach((checkbox) => {
//       checkbox.addEventListener("change", () => {
//         const price = parseFloat(checkbox.dataset.price);

//         if (checkbox.checked) {
//           selectedDesigns.push({ title: checkbox.value, price });
//         } else {
//           selectedDesigns = selectedDesigns.filter(
//             (d) => d.title !== checkbox.value
//           );
//         }

//         const total = selectedDesigns.reduce((sum, d) => sum + d.price, 0);
//         totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;

//         checkoutBtn.disabled = selectedDesigns.length === 0;
//       });
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//     container.innerHTML =
//       "<p class='text-center text-danger'>Failed to load designs.</p>";
//   });

// // Handle checkout
// checkoutBtn.addEventListener("click", () => {
//   if (!selectedDesigns.length) return;
//   alert(
//     `You are purchasing:\n${selectedDesigns
//       .map((d) => d.title)
//       .join(", ")}\nTotal: $${selectedDesigns
//       .reduce((sum, d) => sum + d.price, 0)
//       .toFixed(2)}`
//   );

//   // Optionally, you can redirect to a checkout page here
//   // window.location.href = "/checkout";
// });

const container = document.getElementById("container-product");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

let selectedDesigns = [];

// Fetch designs
fetch("/designs/list")
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
        price = 20, // default price
      } = design;

      const card = document.createElement("div");
      card.className = "card m-3 shadow-sm position-relative";
      card.style.width = "18rem";
      card.style.cursor = "pointer";

      card.innerHTML = `
        <img src="${
          imageUrl ||
          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        }" class="card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            Type: ${product_type}<br>
            Dimensions: ${length} x ${width} x ${height} cm<br>
            Colors: ${color_1}${color_2 ? ", " + color_2 : ""}<br>
            Price: $${price.toFixed(2)}
          </p>
          <div class="form-check mt-2">
            <input 
              class="form-check-input select-design" 
              type="checkbox" 
              value="${title}" 
              data-price="${price}" 
              id="check-${title.replace(/\s+/g, "")}">
            <label 
              class="form-check-label" 
              for="check-${title.replace(/\s+/g, "")}">
              Select
            </label>
          </div>
          <button class="btn btn-primary mt-2 select-btn">Customize</button>
        </div>
      `;

      container.appendChild(card);

      // Click anywhere on card to toggle selection (except buttons)
      card.addEventListener("click", (e) => {
        if (
          e.target.tagName === "BUTTON" ||
          e.target.tagName === "INPUT" ||
          e.target.tagName === "LABEL"
        )
          return;

        const checkbox = card.querySelector(".select-design");
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event("change"));
      });

      // Handle checkbox changes
      const checkbox = card.querySelector(".select-design");
      checkbox.addEventListener("change", () => {
        const priceValue = parseFloat(checkbox.dataset.price);

        if (checkbox.checked) {
          selectedDesigns.push({ title: checkbox.value, price: priceValue });
          card.style.border = "2px solid #28a745"; // highlight selected card
        } else {
          selectedDesigns = selectedDesigns.filter(
            (d) => d.title !== checkbox.value
          );
          card.style.border = ""; // remove highlight
        }

        // Update total price
        const total = selectedDesigns.reduce((sum, d) => sum + d.price, 0);
        totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;

        // Enable/disable checkout button
        checkoutBtn.disabled = selectedDesigns.length === 0;
      });

      // Customize button
      card.querySelector(".select-btn").addEventListener("click", () => {
        customize(title.replace(/\s+/g, ""));
      });
    });
  })
  .catch((err) => {
    console.error(err);
    container.innerHTML =
      "<p class='text-center text-danger'>Failed to load designs.</p>";
  });

// Checkout
checkoutBtn.addEventListener("click", () => {
  if (!selectedDesigns.length) return;

  const summaryContainer = document.getElementById("checkout-summary");
  summaryContainer.innerHTML = `
    <div class="card p-3 shadow-sm">
      <h5>Checkout Summary</h5>
      <ul class="list-group list-group-flush">
        ${selectedDesigns
          .map(
            (d) =>
              `<li class="list-group-item d-flex justify-content-between">
                 ${d.title} <span>$${d.price.toFixed(2)}</span>
               </li>`
          )
          .join("")}
        <li class="list-group-item d-flex justify-content-between fw-bold">
          Total <span>$${selectedDesigns
            .reduce((sum, d) => sum + d.price, 0)
            .toFixed(2)}</span>
        </li>
      </ul>
      <button id="confirm-btn" class="btn btn-primary mt-3">Confirm Purchase</button>
    </div>
  `;

  // Optional: handle confirm purchase
  document.getElementById("confirm-btn").addEventListener("click", () => {
    alert("Purchase confirmed! Thank you for your order.");
    // Clear selections
    selectedDesigns = [];
    document.querySelectorAll(".select-design").forEach((cb) => (cb.checked = false));
    document.querySelectorAll(".card").forEach((card) => (card.style.border = ""));
    totalPriceEl.textContent = "Total: $0.00";
    checkoutBtn.disabled = true;
    summaryContainer.innerHTML = "";
  });
});
