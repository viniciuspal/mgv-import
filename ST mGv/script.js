// Dados dos produtos
const products = [
    { name: 'Calça Jeans', category: 'calca', price: randomPrice(), img: 'img/calça jeans.webp' },
    { name: 'Camiseta Básica', category: 'camiseta', price: randomPrice(), img: 'img/417VRBxot4L._SY1000_.jpg' },
    { name: 'Cueca Boxer', category: 'cueca', price: randomPrice(), img: 'img/calvin clain.webp' },
    { name: 'Calça Sarja', category: 'calca', price: randomPrice(), img: 'img/calca_paper_cargo_preta_12899_1_5ce6d13b2480ce8a7a597596d31e3a3e.webp' },
    { name: 'Camiseta Estampada', category: 'camiseta', price: randomPrice(), img: 'img/Branco_72289017.avif' },
    { name: 'Cueca Algodão', category: 'cueca', price: randomPrice(), img: 'img/cueca zorba.webp' }
];

let cart = [];

function randomPrice() {
    return Math.random() * (300 - 100) + 100;
}

function displayProducts(productList) {
    const productContainer = document.getElementById('productList');
    productContainer.innerHTML = '';

    if(productList.length === 0) {
        productContainer.innerHTML = '<p style="text-align:center;">Nenhum produto encontrado.</p>';
        return;
    }

    productList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Adicionar ao Carrinho</button>
        `;
        productContainer.appendChild(productCard);
    });
}

function filterProducts(category) {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
}

function showAllProducts() {
    displayProducts(products);
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    document.getElementById('cartCount').textContent = cart.length;

    const total = cart.reduce((sum, p) => sum + p.price, 0);
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

function viewCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if(cart.length === 0) {
        cartItems.innerHTML = '<li>O carrinho está vazio.</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
        });
    }

    document.getElementById('cartModal').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function finalizePurchase() {
    if(cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alert(`Compra finalizada! Total: R$ ${cart.reduce((sum, p) => sum + p.price, 0).toFixed(2)}`);
    cart = [];
    updateCart();
    closeCart();
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
}

// Inicializa mostrando todos os produtos
showAllProducts();
updateCart();