//function carregarElementos() {
    // Carregar cabeçalho
 //   var xhrHeader = new XMLHttpRequest();
//    xhrHeader.open("GET", "/index-menu.html", true);
 //   xhrHeader.onreadystatechange = function () {
 //       if (xhrHeader.readyState == 4 && xhrHeader.status == 200) {
  //          document.querySelector(".header-content").innerHTML = xhrHeader.responseText;
  //      }
 //   };
 //   xhrHeader.send();

    // Carregar rodapé
 //   var xhrFooter = new XMLHttpRequest();
 //   xhrFooter.open("GET", "/index-footer.html", true);
 //   xhrFooter.onreadystatechange = function () {
  //      if (xhrFooter.readyState == 4 && xhrFooter.status == 200) {
  //         document.querySelector(".footer").innerHTML = xhrFooter.responseText;
  //      }
    //};
  //  xhrFooter.send();

//}

// Quando o documento estiver pronto, chamar a função para carregar os elementos
//document.addEventListener("DOMContentLoaded", function () {
//    carregarElementos();
//});


function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.src = `/model/repositories/src/images/${product.watch_brand}/${product.image}`;
  img.alt = 'Imagem do Produto';
  img.className = 'product-image';

  const name = document.createElement('div');
  name.textContent = product.watch_name;
  name.className = 'product-name';

  const price = document.createElement('div');
  price.textContent = `R$ ${product.price.toFixed(2)}`;
  price.className = 'product-price';

  const buyButton = createButton('Compre Já', () => {
    console.log(`Produto comprado: ${product.watch_name}`);
  }, 'buy-button');

  const addToCartButton = createButton('', () => {
   // console.log(`Produto adicionado ao carrinho: ${product.watch_name}`);
  }, 'cart-button');
  const cartIcon = createCartIcon();
  addToCartButton.appendChild(cartIcon);

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(buyButton);
  //card.appendChild(addToCartButton);

  return card;
}

function createButton(text, clickHandler, className) {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = className;
  button.addEventListener('click', clickHandler);
  return button;
}

function createCartIcon() {
  const icon = document.createElement('i');
  icon.className = 'fas fa-shopping-cart';
  return icon;
}

function loadProductsInContainer(containerId, limit, productNames = []) {
  fetch(`/model/repositories/ProductRepository.json`)
    .then(response => response.json())
    .then(data => {
      const cardContainer = document.getElementById(containerId);
      cardContainer.innerHTML = ''; // Limpa o conteúdo dos cartões antes de adicionar novos dados

      const selectedProducts = productNames.length > 0
        ? data.filter(product => productNames.includes(product.watch_name)).slice(0, limit)
        : data.slice(0, limit);

      selectedProducts.forEach(product => {
        const card = createProductCard(product);
        cardContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

// Exemplo de uso para a primeira seção (todos os produtos)
const limit = 20; // Limite de produtos a serem exibidos
loadProductsInContainer('card-container', limit);

// Exemplo de uso para a segunda seção (produtos específicos)
const productsToDisplayMais = ['SportySensation', 'DaringDiva', 'TechTrend', 'DiveMaster']; // Nomes dos produtos desejados
const limitMais = 4; // Limite de produtos a serem exibidos
loadProductsInContainer('card-container-mais', limitMais, productsToDisplayMais);

