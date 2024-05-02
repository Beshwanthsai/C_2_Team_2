// Assuming you have a cart data structure (replace with your logic)
let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

function addToCart(productId, price, quantity = 1) {
  // Check if item already exists in cart
  const existingItem = cartItems.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ id: productId, price: price, quantity: quantity });
  }
  updateCart();
  saveCartToLocalStorage();
}

function updateCart() {
  let total = 0;
  let cartItemsHtml = "";

  // Loop through cart items and build HTML
  for (let item of cartItems) {
    cartItemsHtml += `
      <div class="cart-item">
        <p>Product ID: ${item.id}</p>
        <p>Price: &#36;${item.price.toFixed(2)}</p>
        <label for="quantity-${item.id}">Quantity:</label>
        <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(${item.id})">
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    total += item.price * item.quantity;
  }

  // Update cart items section and total price
  document.getElementById("cart-items").innerHTML = cartItemsHtml;
  document.getElementById("cart-total").innerHTML = `Total: &#36;${total.toFixed(2)}`;
}

function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  updateCart();
  saveCartToLocalStorage();
}

function updateCartItemQuantity(productId) {
  const quantityInput = document.getElementById(`quantity-${productId}`);
  const newQuantity = parseInt(quantityInput.value, 10);

  if (isNaN(newQuantity) || newQuantity <= 0) {
    alert("Invalid quantity. Please enter a positive number.");
    return;
  }

  const itemIndex = cartItems.findIndex(item => item.id === productId);
  cartItems[itemIndex].quantity = newQuantity;

  updateCart();
  saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Load cart items from localStorage on page load
window.onload = function() {
  updateCart();
}
