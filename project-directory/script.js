document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const addItemForm = document.getElementById('addItemForm');
    const editItemForm = document.getElementById('editItemForm');
    const stockList = document.getElementById('stockList');
    const editModal = document.getElementById('editModal');
    const closeModal = document.querySelector('.close');
    const searchBox = document.getElementById('searchBox');

    let stock = JSON.parse(localStorage.getItem('stock')) || [];

    function saveStock() {
        localStorage.setItem('stock', JSON.stringify(stock));
    }

    function formatDate(date) {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    }

    function renderStock(items = stock) {
        stockList.innerHTML = '';
        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${item.name} - Quantidade: ${item.quantity} - Validade: ${formatDate(item.expiryDate)}</span>
                <button onclick="editItem(${index})">Editar</button>
                <button onclick="deleteItem(${index})">Deletar</button>
            `;
            stockList.appendChild(listItem);
        });
    }

    addItemForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const itemName = document.getElementById('itemName').value;
        const itemQuantity = document.getElementById('itemQuantity').value;
        const itemExpiryDate = document.getElementById('itemExpiryDate').value;
        stock.push({ name: itemName, quantity: itemQuantity, expiryDate: itemExpiryDate });
        saveStock();
        renderStock();
        addItemForm.reset();
    });

    window.editItem = function(index) {
        document.getElementById('editItemId').value = index;
        document.getElementById('editItemName').value = stock[index].name;
        document.getElementById('editItemQuantity').value = stock[index].quantity;
        document.getElementById('editItemExpiryDate').value = stock[index].expiryDate;
        editModal.style.display = 'block';
    }

    editItemForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const index = document.getElementById('editItemId').value;
        stock[index].name = document.getElementById('editItemName').value;
        stock[index].quantity = document.getElementById('editItemQuantity').value;
        stock[index].expiryDate = document.getElementById('editItemExpiryDate').value;
        saveStock();
        renderStock();
        editModal.style.display = 'none';
    });

    window.deleteItem = function(index) {
        const confirmDeletion = confirm('Você tem certeza que deseja deletar este item?');
        if (confirmDeletion) {
            stock.splice(index, 1);
            saveStock();
            renderStock();
        }
    }

    closeModal.addEventListener('click', function() {
        editModal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    }

    window.searchItem = function() {
        const query = searchBox.value.toLowerCase();
        const filteredItems = stock.filter(item => item.name.toLowerCase().includes(query));
        renderStock(filteredItems);
    }

    renderStock();
});

function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
}
