function createHeader() {
    const header = document.querySelector('.header');
    header.innerHTML = `
        <img src="/assets/img/logo-yks-2.svg" alt="Logo da YKS" class="logo">
        <p class="header-description">
            | Camisas de Time
        </p>
    `;

    header.style.backgroundColor = '#2A2C4C';
    header.style.padding = '.8rem 0';
    header.style.display = 'flex';
    header.style.justifyContent = 'center';
    header.style.alignItems = 'center';
    header.style.gap = '.5rem';

    const logo = header.querySelector('.logo');
    logo.style.width = '110px';

    const description = header.querySelector('.header-description');
    description.style.color = '#fff';
    description.style.fontSize = '1.3rem';
    description.style.fontWeight = '600';
}

createHeader();