function toggleCart() {
    const cartPopup = document.getElementById('cartPopup');
    if (cartPopup.style.display === 'block') {
        cartPopup.style.display = 'none';
    } else {
        cartPopup.style.display = 'block';
    }
}