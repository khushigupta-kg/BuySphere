const container = document.getElementById("product-container");
const loading = document.getElementById("loading");


async function getProducts() {
  try {
    loading.style.display = "block";

    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    displayProducts(data.products);
  } catch (error) {
    container.innerHTML = "<p>Error loading data</p>";
  } finally {
    loading.style.display = "none";
  }
}


function displayProducts(products) {
  container.innerHTML = "";

  products.map(product => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${product.images[0]}" />
      <h3>${product.title}</h3>
      <p>₹ ${product.price}</p>
      <button>Add to Cart</button>
    `;

    container.appendChild(div);
  });
}




getProducts();
