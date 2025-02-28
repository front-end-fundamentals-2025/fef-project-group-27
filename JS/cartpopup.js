let cart = JSON.parse(localStorage.getItem('cart')) || [];

function toggleCart() {
    const cartPopup = document.getElementById('cartPopup');
    if (cartPopup.style.display === 'block') {
        cartPopup.style.display = 'none';
    } else {
        cartPopup.style.display = 'block';
        updateCartPopup();
    }
}

function addToCart(product) {
    const productData = JSON.parse(product.getAttribute('data-product'));
    cart.push(productData);
    saveCartToLocalStorage();
    updateCartCount();
    updateCartPopup();
    animateCartIcon();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.length;
}

function animateCartIcon() {
    const cartIcon = document.querySelector('.button-cart-icon');
    cartIcon.classList.add('bounce');
    setTimeout(() => {
        cartIcon.classList.remove('bounce');
    }, 500);
}

function updateCartPopup() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px;">
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    const cartTotal = document.createElement('div');
    cartTotal.id = 'cartTotal';
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartItems.appendChild(cartTotal);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    updateCartCount(); 
    updateCartPopup();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateCartPopup();
});