const container = document.getElementById("product-container");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const toggleBtn = document.getElementById("theme-toggle");
const loading = document.getElementById("loading");

let allProducts = [];


async function getProducts() {
  try {
    loading.style.display = "block";

    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    allProducts = data.products;

    displayProducts(allProducts);
    populateCategories(allProducts);

  } catch (error) {
    container.innerHTML = "<h2>Error loading products</h2>";
    console.log(error);
  } finally {
    loading.style.display = "none";
  }
}

getProducts();


function displayProducts(products) {
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<h2>No products found 😢</h2>";
    return;
  }

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${product.images[0]}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>₹ ${product.price}</p>
      <button onclick="alert('Added ❤️')">❤️</button>
    `;

    container.appendChild(div);
  });
}


function applyFilters() {
  let result = [...allProducts];


  result = result.filter(p =>
    p.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );


  if (categorySelect.value !== "all") {
    result = result.filter(p => p.category === categorySelect.value);
  }


  if (sortSelect.value === "low-high") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "high-low") {
    result.sort((a, b) => b.price - a.price);
  }

  displayProducts(result);
}

searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);


function populateCategories(products) {
  const categories = ["all", ...new Set(products.map(p => p.category))];

  categorySelect.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join("");
}


toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

