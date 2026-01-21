/* ---------- Mobile Menu Toggle ---------- */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});


/* ---------- Contact Form ---------- */
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been received.");
    contactForm.reset();
});


/* ---------- Cart Logic ---------- */

// Load cart from localStorage
let cart = [];
const savedCart = localStorage.getItem("cartData");
if (savedCart) {
    cart = JSON.parse(savedCart);
}

const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const cartCountEl = document.getElementById("cart-count");

// Open cart
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
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ name: name, price: price, qty: 1 });
        }

        updateCart();
    });
});

// Update cart UI + save to localStorage
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
                <button class="remove-btn" data-name="${item.name}">Remove</button>
            </div>
        `;
    });
    const removeButtons = document.querySelectorAll(".remove-btn");
       removeButtons.forEach(btn =>{
          btn.addEventListener("click", () =>{
          const productName=btn.dataset.name;
          const item=cart.find(p => p.name === productName);
        if(item.qty>1){
            item.qty-=1;
        }
        else{
            cart=cart.filter(p => p.name !== productName);
        }
        updateCart();
    });
});

    totalPriceEl.textContent = total;
    cartCountEl.textContent = count;

    localStorage.setItem("cartData", JSON.stringify(cart));
}


/* ---------- Category Cards Logic ---------- */
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

        document
            .getElementById("products")
            .scrollIntoView({ behavior: "smooth" });
    });
});


/* ---------- Buy Now ---------- */
const buyNowBtn = document.getElementById("buy-now");

buyNowBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("🎉 Order placed successfully!");

    cart = [];
    localStorage.removeItem("cartData");
    updateCart();
    cartSidebar.classList.remove("open");
});


// Render cart on page load
updateCart();





