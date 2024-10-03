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

async function obterCoordenadas(cep) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${cep}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0',
            }
        });
        const data = await response.json();

        if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            return { lat, lon };
        } else {
            throw new Error('CEP não encontrado');
        }
    } catch (error) {
        console.error('Erro ao obter coordenadas:', error);
        return null;
    }
}

function calcularDistanciaHaversine(coord1, coord2) {
    const raioTerraKm = 6371
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lon - coord1.lon);
    const lat1 = toRad(coord1.lat);
    const lat2 = toRad(coord2.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return raioTerraKm * c;
}

function toRad(value) {
    return value * Math.PI / 180;
}

async function calculaFrete(cepDestino) {
    const cepOrigem = '04696-000';

    try {
        const coordOrigem = await obterCoordenadas(cepOrigem);
        const coordDestino = await obterCoordenadas(cepDestino);

        if (!coordOrigem || !coordDestino) {
            console.log('Não foi possível calcular a distância.');
            return 0;
        }

        const distancia = calcularDistanciaHaversine(coordOrigem, coordDestino);
        console.log(`Distância: ${distancia.toFixed(2)} km`);

        const valorFrete = 5.00 * distancia;
        return valorFrete;
    } catch (error) {
        console.error('Erro ao calcular o frete:', error);
        return 0;
    }
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
        const freight = await calculaFrete(cep);
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
