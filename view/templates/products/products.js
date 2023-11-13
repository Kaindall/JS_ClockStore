// Paginação
let currentPage = 1;
const pageSize = 28; // Limite o número de produtos por página
let totalProducts = 0;

function loadProducts(page) {
  fetch('/trabalho2/model/repositories/ProductRepository.json')
    .then(response => response.json())
    .then(data => {
      totalProducts = data.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const productsToShow = data.slice(startIndex, endIndex);

      const cardContainer = document.getElementById('card-container');
      cardContainer.innerHTML = '';

      productsToShow.forEach(product => {
  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.src = `/trabalho2/model/repositories/src/images/${product.watch_brand}/${product.image}`;
  img.alt = 'Imagem do Produto';
  img.className = 'product-image';

  const name = document.createElement('div');
  name.textContent = product.watch_name;
  name.className = 'product-name';

  const price = document.createElement('div');
  price.textContent = `R$ ${product.price.toFixed(2)}`;
  price.className = 'product-price';

  const buyButton = createButton('Compre Já', () => {
    const message = `Produto Adicionado ao Carrinho: ${product.watch_name}`;
    window.alert(message);
  }, 'buy-button');

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(buyButton);
  cardContainer.appendChild(card);
});

      document.getElementById('current-page').textContent = page;
      const totalPages = Math.ceil(totalProducts / pageSize);
      document.getElementById('total-pages').textContent = totalPages;

      document.getElementById('prev-page').disabled = page === 1;
      document.getElementById('next-page').disabled = page === totalPages;
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadProducts(currentPage);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  const totalPages = Math.ceil(totalProducts / pageSize);
  if (currentPage < totalPages) {
    currentPage++;
    loadProducts(currentPage);
  }
});

// Função auxiliar para criar botões
function createButton(text, onClick, className) {
  const button = document.createElement('button');
  button.textContent = text;
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  button.className = className;
  return button;
}

// Função auxiliar para criar um ícone de carrinho
function createCartIcon() {
  // Implemente conforme necessário
  const cartIcon = document.createElement('span');
  cartIcon.textContent = 'Carrinho';
  return cartIcon;
}

// Inicialmente, carregue a primeira página ao iniciar a aplicação
loadProducts(currentPage);
