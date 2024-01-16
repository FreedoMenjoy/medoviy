let productName = [];
let productLink = [];
let productPrice = [];
let productPhoto = [];
let nowPage = 1;
const productsPerPage = 12;

function setLists(data) {
    if (data) {
        for (let i = 0; i < data.productPhoto.length; i++) {
            productPhoto.push(data.productPhoto[i]);
            productName.push(data.productName[i]);
            productLink.push(data.productLink[i]);
            productPrice.push(data.productPrice[i]);
        }
        return Promise.resolve();
    } else {
        console.error("Error: 'productData' is missing 'productPhoto' property or is undefined.");
        return Promise.reject("Error: 'productData' is missing 'productPhoto' property or is undefined.");
    }
}

function goToPage(page) {
    const totalProducts = productName.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    if (page < 1 || page > totalPages) {
        console.error('Недопустимый номер страницы');
        return;
    }
    const newBlock = Math.ceil(page * productsPerPage / productsPerPage);
    const parent1 = document.querySelector('.parent1');
    parent1.innerHTML = '';
    for (let i = (newBlock - 1) * productsPerPage; i < Math.min(newBlock * productsPerPage, totalProducts); i++) {
        const truncatedProductName = productName[i].length > 51 ? productName[i].substring(0, 51 - 3) + '...' : productName[i];
        parent1.innerHTML += `
            <div class="good" id="good${i}">
                <a href="${productLink[i]}">
                    <img class="good-image" src="${productPhoto[i]}">
                    <div class="text-good-container">
                        <h1>${truncatedProductName}</h1>
                        <h2>${productPrice[i]}₽</h2>
                    </div>
                </a>
                <div class="buttons-line">
                    <div class="buy-to-cart1">В корзину</div>
                    <div class="wishlist3"></div>
                    <div class="compare3"></div>
                </div>
            </div>
        `;
    }
    nowPage = page;
    setPages();
}

function nextPage(page){
    const totalPages = Math.ceil(productName.length / productsPerPage);
    let pageToMove = nowPage + page;
    if (pageToMove > totalPages){
        pageToMove = 1;
    }
    if (pageToMove < 1 ) {
        pageToMove = totalPages;
    }
    
    goToPage(pageToMove);
}

function setPages() {
    const pages = document.querySelector('.pages');
    pages.innerHTML = '';
    const totalPages = Math.ceil(productName.length / productsPerPage);
    if (totalPages > 5) {
        const halfPages = Math.ceil(totalPages / 2);
        const showToMost = nowPage > halfPages;
        if (nowPage == 1 || nowPage == totalPages){
            if (nowPage == 1){
                pages.innerHTML += `<li class="pages-current-page"">${nowPage}</li>`;
                addLI(pages, nowPage + 1)
                addLI(pages, nowPage + 2)
                pages.innerHTML += `<li class="pages-dots">...</li>`;
                addLI(pages, totalPages)
            } else{
                addLI(pages, 1)
                pages.innerHTML += `<li class="pages-dots">...</li>`;
                addLI(pages, nowPage - 2)
                addLI(pages, nowPage - 1)
                pages.innerHTML += `<li class="pages-current-page"">${nowPage}</li>`;
            }
        }
        else {
            if (nowPage - 2 >= 1 && nowPage + 2 <= totalPages) {
                addLI(pages, 1)
                pages.innerHTML += `<li class="pages-dots">...</li>`;
                addLI(pages, nowPage - 1)
                pages.innerHTML += `<li class="pages-current-page"">${nowPage}</li>`;
                addLI(pages, nowPage + 1)
                pages.innerHTML += `<li class="pages-dots">...</li>`;
                addLI(pages, totalPages)
            } else {
                if (!showToMost) {
                    if (nowPage > 1) {
                        addLI(pages, nowPage - 1)
                    }
                    pages.innerHTML += `<li class="pages-current-page"">${nowPage}</li>`;
                    if (nowPage < totalPages) {
                        addLI(pages, nowPage + 1)
                    }
                    pages.innerHTML += `<li class="pages-dots">...</li>`;
                    addLI(pages, totalPages)
                } else {
                    addLI(pages,  1)
                    pages.innerHTML += `<li class="pages-dots">...</li>`;
                    addLI(pages, nowPage - 1)
                    pages.innerHTML += `<li class="pages-current-page"">${nowPage}</li>`;
                    if (nowPage < totalPages) {
                        addLI(pages, nowPage + 1)
                    }
                }
            }
        }
    }  else {
        for (let page = 1; page <= totalPages; page++) {
            if (page == nowPage){
                pages.innerHTML += `<li class="pages-current-page"">${page}</li>`;
            } else {
                addLI(pages, page)
            }
        }
    }
}

function addLI(pages, pagenumber) {
    pages.innerHTML += `<li class="pages-number" onclick="goToPage(${pagenumber})">${pagenumber}</li>`;
}