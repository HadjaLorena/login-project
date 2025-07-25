import { PORT } from "../../settingsFront.js";
import { getToken, redirectIfNotLogged, parseJwt } from "./utils";

const api = `http://localhost:${PORT}/api`;
redirectIfNotLogged();

const token = getToken();
const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const logoutBtn = document.getElementById('logoutBtn');
const emptyMessage = document.getElementById('emptyMessage');

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
});

// Save a a new product
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const product = {
        productId: document.getElementById('productId').value,
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: document.getElementById('productPrice').value
    };

    const res = await fetch(`${api}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });

    if(res.ok) {
        alert('Registered product!');
        productForm.reset();
        loadProducts();
    } else {
        const data = await res.json();
        alert(data.message || 'Error registering');
    }
});

// Show products
async function loadProducts() {
    const res = await fetch(`${api}/products`);
    const products = await res.json();
    const userId = parseJwt(token)?.id;

    productList.innerHTML = '';

    if(!products.length) {
        emptyMessage.classList.remove('hidden');
        return;
    }

    emptyMessage.classList.add('hidden');

    products.forEach((p) => {
        const card = document.createElement('div');
        card.className = 'p-4 bg-white shadow rounded';
        card.innerHTML = `
            <h3 class="font-bold text-lg">${p.name} (ID: ${p.productId})</h3>
            <p>${p.description || ''}</p>
            ${p.userId === userId ? `
                <div class="flex gap-2 mt-2">
                    <button onclick="editProduct('${p._id}')" class="bg-yellow-400 px-2 py-1 rounded">Edit</button>
                    <button onclick="deleteProduct('${p._id}')" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </div>` : ''
            }
        `;
        productList.appendChild(card);
    });
}

loadProducts();

// Update product
window.editProduct = async (id) => {
    const name = prompt('New name:');
    const price = prompt('New price:');

    const res = await fetch(`${api}/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({name, price})
    });

    if(res.ok) {
        alert('Product updated!');
        loadProducts();
    } else {
        alert('Error updating');
    }
};

// Delete product
window.deleteProduct = async (id) => {
    if(!confirm('Are you sure you want to delete this product?')) return;

    const res = await fetch(`${api}/products/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if(res.ok) {
        alert('Product deleted');
        loadProducts();
    } else {
        alert('Error deleting');
    }
};