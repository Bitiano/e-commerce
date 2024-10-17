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

async function obterEndereco(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.erro) {
            throw new Error('CEP não encontrado');
        }

        return data;
    } catch (error) {
        console.error('Erro ao obter endereço:', error);
        return null;
    }
}

function renderFreightOptions(endereco) {
    const freightOptionsContainer = document.getElementById('freight-options');
    freightOptionsContainer.innerHTML = `
        <h3>Opções de Frete para ${endereco.logradouro}, ${endereco.uf}</h3>
        <div class="freight-option">
            <input type="radio" id="frete-padrao" name="frete" value="5">
            <label for="frete-padrao">Entrega padrão (5 a 7 dias úteis) - R$5,00</label>
        </div>
        <div class="freight-option">
            <input type="radio" id="frete-express" name="frete" value="14">
            <label for="frete-express">Entrega expressa (1 a 3 dias úteis) - R$14,00</label>
        </div>
        <div class="freight-option">
            <input type="radio" id="frete-rapido" name="frete" value="9">
            <label for="frete-rapido">Entrega rápida (4 a 5 dias úteis) - R$9,00</label>
        </div>
    `;

    const freightOptions = document.getElementsByName('frete');
    freightOptions.forEach(option => {
        option.addEventListener('change', updateTotal);
    });
}

function updateSubtotal() {
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cart = getCart();
    const subtotal = cart.reduce((acc, item) => acc + item.preco * item.quantity, 0);
    cartSubtotalElement.textContent = `Subtotal: R$${subtotal.toFixed(2)}`;
    updateTotal();
}

function updateTotal() {
    const cart = getCart();
    const subtotal = cart.reduce((acc, item) => acc + item.preco * item.quantity, 0);
    const selectedFreight = document.querySelector('input[name="frete"]:checked');
    const freightCost = selectedFreight ? parseFloat(selectedFreight.value) : 0;
    const total = subtotal + freightCost;
    const cartTotalElement = document.getElementById('cart-total');
    cartTotalElement.textContent = `Total: R$${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout-btn');
    const freightForm = document.getElementById('freight-form');
    const freightResult = document.getElementById('freight-result');

    cartItemsContainer.addEventListener('click', (event) => {
        const cart = getCart();
        if (event.target.classList.contains('increase-quantity')) {
            const index = event.target.dataset.index;
            cart[index].quantity++;
            saveCart(cart);
            renderCartItems();
        } else if (event.target.classList.contains('decrease-quantity')) {
            const index = event.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                saveCart(cart);
                renderCartItems();
            }
        } else if (event.target.classList.contains('remove-item')) {
            const index = event.target.dataset.index;
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

    freightForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const cep = document.getElementById('cep-input').value;
        const endereco = await obterEndereco(cep);

        if (endereco) {
            freightResult.textContent = '';
            renderFreightOptions(endereco);
        } else {
            freightResult.textContent = 'CEP inválido. Por favor, tente novamente.';
        }
    });

    checkoutButton.addEventListener('click', () => {
        alert('Compra finalizada!');
        const cart = [];
        saveCart(cart);
        renderCartItems();
    });

    renderCartItems();
});