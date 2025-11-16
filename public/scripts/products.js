const url = window.location.pathname;
const pathParts = url.split("/");
// link.com -> 0
// product -> 1
// username -> 2?

var userName = "guest";
if (pathParts.length > 2) userName = pathParts[pathParts.length - 1];

const container = document.getElementById("container-product");
fetch("/products/getAllProducts")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "card";
      productCard.innerHTML = `
        <div class="card-inner">
          <div class="card-img">
            <img src="${
              product.images?.[0]?.url ||
              "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
            }" alt="${product.name}" />
          </div>
          <div class="card-info">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-description">${product.description}</p>
            <p class="card-price">Starting from €${product.min_price.toFixed(
              2
            )}</p>
            <button class="select-btn" id="${product.name
              .replace(" ", "")
              .toLowerCase()}"
              onclick="customize('${product.name.replace(
                " ",
                ""
              )}')">Select</button>
          </div>
        </div>
      `;
      container.appendChild(productCard);
    });
  })
  .catch((error) => console.error(error));

function customize(productType) {
  window.location.href = `/products/${userName}/customization/${productType}`;
}
