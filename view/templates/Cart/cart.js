function createProductRow(product) {
    const row = document.createElement('tr');
  
    // Crie as células da linha
    const imgCell = document.createElement('td');
    const img = document.createElement('img');
    img.src = `/trabalho2/model/repositories/src/images/${product.watch_brand}/${product.image}`;
    img.alt = 'Imagem do Produto';
    img.classList.add('product-image'); // Adicione a classe 'product-image' à imagem
    imgCell.appendChild(img);
    row.appendChild(imgCell);
  
    const nameCell = document.createElement('td');
    nameCell.textContent = product.watch_name;
    nameCell.classList.add('product-name'); // Adicione a classe 'product-name' ao nome
    row.appendChild(nameCell);
  
    const brandCell = document.createElement('td');
    brandCell.textContent = product.watch_brand;
    brandCell.classList.add('product-brand'); // Adicione a classe 'product-brand' à marca
    row.appendChild(brandCell);
  
    const categoryCell = document.createElement('td');
    categoryCell.textContent = product.category;
    categoryCell.classList.add('product-category'); // Adicione a classe 'product-category' à categoria
    row.appendChild(categoryCell);
  
    const quantityCell = document.createElement('td');
    quantityCell.textContent = product.quantity;
    quantityCell.classList.add('product-quantity'); // Adicione a classe 'product-quantity' à célula de quantidade
    row.appendChild(quantityCell);
  
    const priceCell = document.createElement('td');
    priceCell.textContent = `R$ ${product.price.toFixed(2)}`;
    priceCell.classList.add('product-price'); // Adicione a classe 'product-price' à célula de preço
    row.appendChild(priceCell);
  
    return row;
  }
  
  function loadProductsInTable(containerId, limit, productNames = []) {
    fetch(`/trabalho2/model/repositories/ProductRepository.json`)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById(containerId);
        tableBody.innerHTML = ''; // Limpa o conteúdo da tabela antes de adicionar novos dados
  
        const selectedProducts = productNames.length > 0
          ? data.filter(product => productNames.includes(product.watch_name)).slice(0, limit)
          : data.slice(0, limit);
  
        selectedProducts.forEach(product => {
          const row = createProductRow(product);
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }
  
  const limit = 2; // Limite de produtos a serem exibidos
  loadProductsInTable('table-body', limit);
  
  const productsToDisplayMais = ['SportySensation', 'DaringDiva', 'TechTrend', 'DiveMaster']; // Nomes dos produtos desejados
  