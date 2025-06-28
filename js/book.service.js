'use strict';

function getBooks(){
    return [
        {id: 'bj5930', title: '1984', price: 14,imgUrl:'https://example.com/1984.jpg',content: 'A dystopian novel by George Orwell, published in 1949. It is set in a totalitarian society ruled by Big Brother.'},
        {id: 'bj5931', title: 'To Kill a Mockingbird', price: 12,imgUrl:'https://example.com/to-kill-a-mockingbird.jpg',content: 'A novel by Harper Lee published in 1960. It is a coming-of-age story set in the American South during the 1930s.'},
        {id: 'bj5932', title: 'The Great Gatsby', price: 10,imgUrl:'https://example.com/the-great-gatsby.jpg',content: 'A novel by F. Scott Fitzgerald published in 1925. It is set in the Jazz Age and tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.'},
    ]
}

function createBook(title, price) {
    const book = {
        id: makeId(),
        title,
        price: +price,
        imgUrl: 'img/default book cover.jpg',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    };      
    gBooks.push(book);
    showMessage('Book added successfully!');
}

function removeBook(bookId) {
    const bookIndex = gBooks.findIndex(book => book.id === bookId);
    gBooks.splice(bookIndex, 1);   
}
function updateBook(bookId) {
        const newPrice = +prompt('Enter new price:');
        if(isNaN(newPrice)||newPrice <= 0){
        alert('Invalid price. Please enter a valid number greater than or equal to 0.');
        return false;
    }
    const book = gBooks.find(book => book.id === bookId);
    book.price = newPrice;
    return true;
}

function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId);
    const elModal = document.querySelector('.book-details-modal');
    const elContent = elModal.querySelector('.dialog-content');

    elContent.innerHTML = `
        <h2 class="book-title">${book.title}</h2>
        <img class="book-image" src="${book.imgUrl}" />
        <p class="book-price">Price: $${book.price}</p>
        <p class="book-txt">${book.content}</p>`;

    elModal.showModal();
}

function addBook() {
    const title = prompt('Enter book title:');
    if (!title) {
        alert('Title cannot be empty');
        return false;
    }
    const price = +prompt('Enter book price:');
    if (isNaN(price) || price < 0) {
        alert('Invalid price. Please enter a valid number greater than or equal to 0.');
        return false;
    }
    createBook(title, price);
    return true;
}

function makeId(){
    var text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function resetSearch(){
    gFilterBy = ''
    render(gFilterBy);
}
function clearTextInput(){
    const elInput = document.querySelector('.input');
    elInput.value = '';
    elInput.focus();
}
function showMessage(msg) {
    const elMessage = document.querySelector('.message-modal'); 
    elMessage.querySelector('.message-text span2').innerText = msg;
    console.log(elMessage);
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