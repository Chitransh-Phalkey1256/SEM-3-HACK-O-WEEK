let products = [];
let cart = [];


// Fetch products from products.json
fetch("products.json")

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to load products.json");
        }

        return response.json();
    })

    .then(data => {

        products = data;

        document.getElementById("status").textContent =
            products.length + " products loaded successfully.";

        displayProducts(products);
    })

    .catch(error => {

        document.getElementById("status").textContent =
            "Error loading products. Please use Live Server.";

        console.error(error);
    });


// Display products
function displayProducts(list) {

    const container =
        document.getElementById("productContainer");

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML =
            "<p>No products found.</p>";

        return;
    }

    list.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${product.name}</h3>

            <p>
                <strong>Category:</strong>
                ${product.category}
            </p>

            <p class="price">
                Price: ₹${product.price}
            </p>

            <p class="available">
                Availability:
                ${product.availability} units
            </p>

            <button
                class="add-btn"
                ${product.availability === 0 ? "disabled" : ""}
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>
        `;

        container.appendChild(card);
    });
}


// Add product to cart
function addToCart(id) {

    const product =
        products.find(p => p.id === id);

    if (!product || product.availability <= 0) {
        return;
    }

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    product.availability--;

    updateCart();

    displayProducts(products);
}


// Remove product from cart
function removeFromCart(id) {

    const item =
        cart.find(item => item.id === id);

    if (!item) {
        return;
    }

    const product =
        products.find(p => p.id === id);

    product.availability += item.quantity;

    cart =
        cart.filter(item => item.id !== id);

    updateCart();

    displayProducts(products);
}


// Update cart
function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <span>
                ${item.name} × ${item.quantity}
            </span>

            <span>
                ₹${item.price * item.quantity}

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>
            </span>
        `;

        cartItems.appendChild(div);
    });


    cartCount.textContent = count;

    cartTotal.textContent = total;


    document
        .getElementById("cartSection")
        .classList.toggle(
            "hidden",
            cart.length === 0
        );
}


// Search products
document
    .getElementById("searchBox")
    .addEventListener("input", function () {

        const query =
            this.value.toLowerCase().trim();


        const filtered =
            products.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(query)

                ||

                product.category
                    .toLowerCase()
                    .includes(query)
            );


        displayProducts(filtered);
    });


// Show / hide cart
document
    .getElementById("cartBtn")
    .addEventListener("click", function () {

        document
            .getElementById("cartSection")
            .classList.toggle("hidden");
    });


// Place order
document
    .getElementById("orderBtn")
    .addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }


        alert(
            "Order placed successfully! Thank you for shopping."
        );


        cart = [];

        updateCart();

        displayProducts(products);
    });