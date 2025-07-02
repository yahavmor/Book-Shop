'use strict';

function getBooksDB(){

    return [
        {id: 'bj59300', title: '1984', price: 14,rating:getRandInt(1,6),imgUrl:'img/1984.jpg',content: 'A dystopian novel by George Orwell, published in 1949. It is set in a totalitarian society ruled by Big Brother.'},
        {id: 'bj59301', title: 'To Kill a Mockingbird', price: 12,rating:getRandInt(1,6),imgUrl:'img/the adventarus of lori ipsi.jpg',content: 'A novel by Harper Lee published in 1960. It is a coming-of-age story set in the American South during the 1930s.'},
        {id: 'bj59302', title: 'The Great Gatsby', price: 10,rating:getRandInt(1,6),imgUrl:'img/zorba the greek.jpg',content: 'A novel by F. Scott Fitzgerald published in 1925. It is set in the Jazz Age and tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.'},
        {id: 'bj59303', title: '984', price: 14,rating:getRandInt(1,6),imgUrl:'img/1984.jpg',content: 'A dystopian novel by George Orwell, published in 1949. It is set in a totalitarian society ruled by Big Brother.'},
        {id: 'bj59304', title: 'Kill a Mockingbird', price: 12,rating:getRandInt(1,6),imgUrl:'img/the adventarus of lori ipsi.jpg',content: 'A novel by Harper Lee published in 1960. It is a coming-of-age story set in the American South during the 1930s.'},
        {id: 'bj59305', title: 'Great Gatsby', price: 10,rating:getRandInt(1,6),imgUrl:'img/zorba the greek.jpg',content: 'A novel by F. Scott Fitzgerald published in 1925. It is set in the Jazz Age and tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.'},
        {id: 'bj59306', title: '4', price: 14,rating:getRandInt(1,6),imgUrl:'img/1984.jpg',content: 'A dystopian novel by George Orwell, published in 1949. It is set in a totalitarian society ruled by Big Brother.'},
        {id: 'bj59307', title: 'a Mockingbird', price: 12,rating:getRandInt(1,6),imgUrl:'img/the adventarus of lori ipsi.jpg',content: 'A novel by Harper Lee published in 1960. It is a coming-of-age story set in the American South during the 1930s.'},
        {id: 'bj59308', title: 'reat Gatsby', price: 10,rating:getRandInt(1,6),imgUrl:'img/zorba the greek.jpg',content: 'A novel by F. Scott Fitzgerald published in 1925. It is set in the Jazz Age and tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.'},
        {id: 'bj59309', title: '84', price: 14,rating:getRandInt(1,6),imgUrl:'img/1984.jpg',content: 'A dystopian novel by George Orwell, published in 1949. It is set in a totalitarian society ruled by Big Brother.'},
        {id: 'bj59310', title: 'Mockingbird', price: 12,rating:getRandInt(1,6),imgUrl:'img/the adventarus of lori ipsi.jpg',content: 'A novel by Harper Lee published in 1960. It is a coming-of-age story set in the American South during the 1930s.'},
        {id: 'bj59311', title: 'Gatsby', price: 10,rating:getRandInt(1,6),imgUrl:'img/zorba the greek.jpg',content: 'A novel by F. Scott Fitzgerald published in 1925. It is set in the Jazz Age and tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.'}
    ]
}
function createBook(title, price, rating, imgUrl) {
    const book = {
        id: makeId(),
        title,
        price: +price,
        imgUrl,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rating
    };      
    gBooks.unshift(book);
}

function removeBook(bookId) {
    const bookIndex = gBooks.findIndex(book => book.id === bookId);
    gBooks.splice(bookIndex, 1);   
}


function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId);
    const elModal = document.querySelector('.book-details-modal');
    const elContent = elModal.querySelector('.dialog-content');

    elContent.innerHTML = `
        <h2 class="book-dialog-title">${book.title}</h2>
        <img class="book-dialog-img" src="${book.imgUrl}" />
        <p class="book-dialog-price">Price: ${book.price}$</p>
        <p class="book-dialog-txt">${book.content}</p>
        <p class="book-dialog-rating">Rating: ${book.rating} stars</p>`;
        

    elModal.showModal();
}

function resetSearch(){
    const elTitleInput = document.querySelector('.input-title')
    const elRatingInput = document.querySelector('.input-rating')
    elRatingInput.value = 0
    elTitleInput.value = ''
    renderBooks();
}
function clearTextInput(){
    const elBookModal = document.querySelector('.book-edit-modal');
    const title = elBookModal.querySelector('.book-name-input').value='';
    const price = elBookModal.querySelector('.book-price-input').value='';
    const rating = elBookModal.querySelector('.book-rating-input').value=''; 
}
function showMessage(msg) {
    const elMessage = document.querySelector('.message-modal'); 
    elMessage.querySelector('.message-text span2').innerText = msg;
    elMessage.classList.remove('hidden');
    var elBody = document.querySelector('body');

    setTimeout(() => {
        elMessage.classList.add('hidden');
    }, 2000);
}
function getStat(){
    gExpensiveBooksCount = gBooks.filter(book => book.price > 200).length;
    gAverageBooksCount = gBooks.filter(book => book.price >= 80 && book.price <= 200).length;
    gCheapBooksCount = gBooks.filter(book => book.price < 80).length;
}
function sortBy(books){
    const dir = gQueryOptions.gSortBy.dir? -1 : 1
    switch (gQueryOptions.gSortBy.option){
        case 'all': return books
        case 'title':return books.sort((a, b) => (a.title.localeCompare(b.title))*dir);
        case 'rating': return books.sort((a,b)=>(a.rating-b.rating)*dir)
        case 'price': return books.sort((a,b)=>(a.price-b.price)*dir)
    }

}
function showPageNumber(){
    const elPageNum = document.querySelector('.page-num');
    const elPageNumber = elPageNum.querySelector('span');
    elPageNumber.innerHTML = gQueryOptions.gPage.idx+1
}

function printBook(book){
    return `
                <div class="book-card">
                <div class="book-card-title">${book.title}</div>
                <img src="${book.imgUrl}"  class="book-card-img" />
                <div class="book-card-price">Price:${book.price} $</div>
                <div class="book-card-rating">Rating: ${'⭐'.repeat(book.rating)}</div>
                <div class="book-card-actions">
                <button class="action read" onclick="onReadBook('${book.id}')">Read</button>
                <button class="action update" onclick="onUpdateBook('${book.id}')">Update</button>
                <button class="action delete" onclick="onRemoveBook('${book.id}')">Delete</button>
                </div>
            </div>`;
}

function sliceBooks(){
    const books = gBooks.slice()
    const startIdx = gQueryOptions.gPage.idx * gQueryOptions.gPage.limit
    const endIdx = startIdx + gQueryOptions.gPage.limit
    gQueryOptions.gPage.totalPages = Math.ceil(books.length / gQueryOptions.gPage.limit )  
    return books.slice(startIdx,endIdx)
}
