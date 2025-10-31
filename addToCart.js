// Selectors
let addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const totalItems = document.getElementById('itemsForCart');
const totalAmount = document.getElementById('total-amount');
const cartIcon = document.getElementById('cart-count'); // cart icon count
let myVariable

let cart = []; // only declare once

// Create Submit Order button
let orderButton = document.createElement('button');
orderButton.className = 'btn btn-success mt-2';
orderButton.textContent = 'Make Payment';
orderButton.style.display = 'none'; // hide initially
orderButton.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Your order was successfully placed!');
        cart = [];
        updateCartUI();
    }
});
cartItemsContainer.parentElement.appendChild(orderButton); // append below cart items

// Update Cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0, count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'border-bottom', 'py-2');
        itemDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.imgSrc}" width="50" height="50" class="me-2 rounded">
                <div>
                    <p class="m-0 fw-bold">${item.name}</p>
                    <p class="m-0 text-success">Rs. ${item.price}</p>
                </div>
            </div>
            <div>
                <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${index}, -1)">-</button>
                <span class="mx-2 fw-bold">${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${index}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    totalAmount.textContent = total;
    totalItems.textContent = count;
    cartIcon.textContent = count;

    // Show the Submit Order button only if cart has items
    orderButton.style.display = cart.length > 0 ? 'block' : 'none';
}

// Change quantity
function changeQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCartUI();
}

// Add to Cart button click
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.card');
        const name = card.querySelector('.card-title').innerText;
        const price = parseInt(card.querySelector('.price').innerText);
        const imgSrc = card.querySelector('img').src;

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, imgSrc, quantity: 1 });
        }

        updateCartUI();

        // Add shake animation to cart icon
        const cartIconElement = document.querySelector('.cart-icon');
        cartIconElement.classList.add('updated');
        setTimeout(() => cartIconElement.classList.remove('updated'), 400);
    });
});
