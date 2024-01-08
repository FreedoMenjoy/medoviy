function goToPage(page) {
    const productsPerPage = 15; 
    const totalProducts = <%= productName.length %>;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    if (page < 1 || page > totalPages) {
        console.error('Недопустимый номер страницы');
        return;
    }
    const newBlock = Math.ceil(page * productsPerPage / 15);
    const currentBlockElement = document.getElementById('currentBlockElement');
    currentBlockElement.innerHTML = newBlock; 
    const parent1 = document.querySelector('.parent1');
    parent1.innerHTML = ''; 
    for (let i = (newBlock - 1) * productsPerPage; i < Math.min(newBlock * productsPerPage, totalProducts); i++) {
        parent1.innerHTML += `
            <div class="good" id="good<%= i %>">
                <img class="good-image" src="<%= productPhoto[i] %>">
                <div class="text-good-container">
                    <% const truncatedProductName = productName[i].length > 51 ? productName[i].substring(0, 51 - 3) + '...' : productName[i]; %>
                    <a href="<%= productLink[i] %>"><h1><%= truncatedProductName %></h1></a>
                    <h2><%= productPrice[i] %>₽</h2>
                </div>
                <div class="buttons-line">
                    <div class="buy-to-cart1">В корзину</div>
                    <div class="wishlist3"></div>
                    <div class="compare3"></div>
                </div>
            </div>
        `;
    }
}