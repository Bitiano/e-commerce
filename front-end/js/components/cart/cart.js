function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
    const cart = getCart();
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    saveCart(cart);
    updateCartIcon();
}

function updateCartIcon() {
    const cart = getCart();
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

document.addEventListener('DOMContentLoaded', updateCartIcon);

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = getCart();

    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.imagesPath}" alt="${item.nome}">
            <div class="cart-item-details">
                <h2>${item.nome}</h2>
                <p>R$${item.preco.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="decrease-quantity" data-index="${index}">-</button>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}">
                <button class="increase-quantity" data-index="${index}">+</button>
            </div>
            <button class="remove-item" data-index="${index}">Remover</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    updateSubtotal();
}

function updateSubtotal() {
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cart = getCart();
    const subtotal = cart.reduce((acc, item) => acc + item.preco * item.quantity, 0);
    cartSubtotalElement.textContent = `Subtotal: R$${subtotal.toFixed(2)}`;
}

function calculaFrete(cep) {
    // Escreve aqui
    const freightRate = 20.00;
    return freightRate;
}

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-btn');
    const freightForm = document.getElementById('freight-form');
    const freightResult = document.getElementById('freight-result');

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('increase-quantity')) {
            const index = event.target.dataset.index;
            const cart = getCart();
            cart[index].quantity++;
            saveCart(cart);
            renderCartItems();
        } else if (event.target.classList.contains('decrease-quantity')) {
            const index = event.target.dataset.index;
            const cart = getCart();
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                saveCart(cart);
                renderCartItems();
            }
        } else if (event.target.classList.contains('remove-item')) {
            const index = event.target.dataset.index;
            const cart = getCart();
            cart.splice(index, 1);
            saveCart(cart);
            renderCartItems();
        }
    });

    cartItemsContainer.addEventListener('input', (event) => {
        if (event.target.type === 'number') {
            const index = event.target.dataset.index;
            const newQuantity = parseInt(event.target.value);
            if (newQuantity > 0) {
                const cart = getCart();
                cart[index].quantity = newQuantity;
                saveCart(cart);
                updateSubtotal();
            }
        }
    });

    freightForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const cep = document.getElementById('cep-input').value;
        const freight = calculaFrete(cep);
        freightResult.textContent = `Frete: R$${freight.toFixed(2)}`;
    });

    checkoutButton.addEventListener('click', () => {
        alert('Compra finalizada!');
        const cart = [];
        saveCart(cart);
        renderCartItems();
    });

    renderCartItems();
});