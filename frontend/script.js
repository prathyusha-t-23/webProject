const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});



// Simple contact form handler
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop real submit for now

    // Just show an alert (later you will connect to DB / file)
    alert("Thank you! Your message has been received.");

    // Optional: reset the form
    contactForm.reset();
});
let cart = [];
const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const cartCountEl = document.getElementById("cart-count");

// When user clicks cart icon → open cart
cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("open");
});

// Close cart
closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
});

// Add to cart buttons
const addCartButtons = document.querySelectorAll(".add-cart-btn");

addCartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let name = btn.dataset.name;
        let price = parseInt(btn.dataset.price);

        // Check if product already exists
        let existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        updateCart();
    });
});

// Update cart UI
function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (x${item.qty})</span>
                <span>₹${item.price * item.qty}</span>
            </div>
        `;
    });

    totalPriceEl.textContent = total;
    cartCountEl.textContent = count;
}
const categoryCards = document.querySelectorAll(".category-card");
const productGrids = document.querySelectorAll(".products-grid");

categoryCards.forEach(card => {
    card.addEventListener("click", () => {
        const selectedCategory = card.dataset.category;

        productGrids.forEach(grid => {
            if (grid.dataset.content === selectedCategory) {
                grid.classList.remove("hidden");
            } else {
                grid.classList.add("hidden");
            }
        });

        // scroll to products section
        document
            .getElementById("products")
            .scrollIntoView({ behavior: "smooth" });
    });
});

const buyNowBtn = document.getElementById("buy-now");
buyNowBtn.addEventListener("click", () => {
    if(cart.length===0){
        alert("Cart is empty");
        return;
    }

    alert("🎉 Order placed successfully!");
    cart = [];
    updateCart();
    cartSidebar.classList.remove("open");
});




