


let products = [];
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];  // Initialize cart from localStorage or an empty array

// Fetch products from API
function cartApi() {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            products = data;         
            displayProducts(products);  // Display the fetched products
        });
}



// Display products on the page
function displayProducts(products) {
    let productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';  // Clear the container

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title.substring(0, 11)}...</h3>
            <p>${product.description.substring(0, 100)}...</p><hr>
            <p>Price: $${product.price}</p><hr>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="Details(${product.id})">Details</button>
        `;
        productContainer.appendChild(productCard);
    });
}

// Add product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);  // Find the product by its ID
    const existingProduct = cart.find(p => p.id === productId);  // Check if the product is already in the cart

    if (existingProduct) {
        // If the product already exists in the cart, just increase the quantity
        existingProduct.quantity += 1;
    } else {
        // If the product is not in the cart, add it with quantity 1 and increment the cart count
        cart.push({ ...product, quantity: 1 });
        updateCartCount();  // Increment cart count only when a new product is added
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

// Update the cart count in the header
function updateCartCount() {
    const cartButton = document.querySelector("#buttons a[href='./cart.html'] button");
    const cartCount = cart.length;  // Calculate the count based on the number of unique items in the cart
    cartButton.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart(${cartCount})`;
}

// Filter products by category
function filterproduct(category) {
    if (category === 'all') {
        displayProducts(products);  // Show all products if 'all' is selected
    } else {
        const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
        displayProducts(filteredProducts);  // Display only the filtered products
    }
}

// Event listener for DOMContentLoaded to fetch products when the page loads
document.addEventListener("DOMContentLoaded", () => {
    cartApi();  // Fetch products from API
    updateCartCount();  // Update the cart count based on localStorage
});
