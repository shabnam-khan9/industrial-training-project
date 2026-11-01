const products = [
    {
        id: 1,
        name: "Matte Lipstick",
        price: 499,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Hydrating Cream",
        price: 799,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Eyeshadow Palette",
        price: 899,
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Floral Perfume",
        price: 999,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Face Wash",
        price: 399,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Vitamin C Serum",
        price: 699,
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Makeup Brush Set",
        price: 599,
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Nail Polish",
        price: 299,
        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];

const productContainer = document.getElementById("product-container");

// Display products
function displayProducts(productList) {
    productContainer.innerHTML = "";

    productList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productContainer.appendChild(card);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    alert(product.name + " added to cart!");
}

// Update cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <button onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total;
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Open or close cart
function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
}

// Search products
function searchProducts() {
    const searchValue = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    displayProducts(filteredProducts);
}

// Place order
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for shopping with Beauty Bliss!");

    cart = [];
    updateCart();
    toggleCart();
}

// Load products when website opens
displayProducts(products);