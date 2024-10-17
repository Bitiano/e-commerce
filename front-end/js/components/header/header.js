import logout from '../logout/logout.js';

function createHeader() {
    const header = document.querySelector('.header');
    const token = localStorage.getItem('token');

    if (token) {
        header.innerHTML = `
            <div class="logo">
                <img src="/assets/img/logo-yks-2.svg" alt="Logo da YKS" class="logo">
            </div>

            <nav class="header-nav">
                <ul class="nav-list">
                    <li class="nav-item">
                        <button id="logout-button" class="nav-link">Logout</button>
                    </li>
                    <li class="nav-item">
                        <a href="edit-client.html" class="nav-link">Editar</a>
                    </li>
                    <li class="nav-item">
                        <buutton class="btn btn-cart">
                            <a href="cart-shopping.html" class="nav-link">
                                <img src="../assets/icons/cart-shopping.svg" alt="cart">
                                <span id="cart-count">0</span>
                            </a>
                        </buutton>
                    </li>
                </ul>
            </nav>
        `;

        const logoutButton = header.querySelector('#logout-button');
        logoutButton.addEventListener('click', logout);

        const cartCount = header.querySelector('#cart-count');
        const cart = localStorage.getItem('cart');
        const cartItems = cart ? JSON.parse(cart) : [];
        const count = cartItems.reduce((total, product) => total + product.quantity, 0);
        cartCount.textContent = count;
    } else {
        header.innerHTML = `
            <div class="logo">
                <img src="/assets/img/logo-yks-2.svg" alt="Logo da YKS" class="logo">
            </div>

            <nav class="header-nav">
                <ul class="nav-list">
                    <li class="nav-item">
                        <a href="login-client.html" class="nav-link">Login</a>
                    </li>
                    <li class="nav-item">
                        <a href="register-client.html" class="nav-link">Cadastrar</a>
                    </li>
                    <li class="nav-item">
                        <buutton class="btn btn-cart">
                            <a href="cart-shopping.html" class="nav-link">
                                <img src="../assets/icons/cart-shopping.svg" alt="cart">
                                <span id="cart-count"></span>
                            </a>
                        </buutton>
                    </li>
                </ul>
            </nav>
        `;

        const cartCount = header.querySelector('#cart-count');
        const cart = localStorage.getItem('cart');
        const cartItems = cart ? JSON.parse(cart) : [];
        const count = cartItems.reduce((total, product) => total + product.quantity, 0);
        cartCount.textContent = count;
    }

    header.style.backgroundColor = '#2A2C4C';
    header.style.padding = '.8rem 2rem';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.gap = '.5rem';

    const logo = header.querySelector('.logo');
    logo.style.display = 'flex';

    const navList = header.querySelector('.nav-list');
    navList.style.display = 'flex';
    navList.style.alignItems = 'center';
    navList.style.gap = '1rem';
    

    const navLink = header.querySelectorAll('.nav-link');
    navLink.forEach(link => {
        link.style.color = '#fff';
        link.style.textDecoration = 'none';
        link.style.background='none';
        link.style.border='none';
        link.style.cursor='pointer';
        link.style.fontSize='1rem';
        link.style.fontWeight='500';
        link.style.display='flex';
        link.style.alignItems='center';
        link.style.gap='5px';
    });


}

document.addEventListener('DOMContentLoaded', createHeader);