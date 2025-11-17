const url = window.location.pathname;
const pathParts = url.split("/");
// link.com -> 0
// product -> 1
// username -> 2?

var userName = "guest";
if (pathParts.length > 2) userName = pathParts[pathParts.length - 1];

const featureCardsContainer = document.getElementById(
  "feature-cards-container"
);
fetch("/products/getAllProducts")
  .then((res) => res.json())
  .then((data) => {
    for (let index = 0; index < 3 && index < data.length; index++) {
      const product = data[index];
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
              <div class="feature-card p-4 h-100 text-center">
                <img
                  src="${
                    product.images?.[0]?.url ||
                    "https://via.placeholder.com/150"
                  }"
                  width="150"
                  height="150"
                  class="img-fluid mb-3"
                  alt="${product.name}"
                />
                <h5>${product.name}</h5>
                
                <a href="/products/${userName}/customization/${product.name
        .trim()
        .replace(" ", "")}
                " class="btn btn-outline-dark mt-2">
                  Start Designing
                </a>
              </div>
            `;
      featureCardsContainer.querySelector(".row").appendChild(col);
    }
  })
  .catch((error) => console.error(error));
