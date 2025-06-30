'use strict';

function getBooks(){
    return [
        {id: 'bj5930', title: '1984', price: 14,rating:getRandInt(1,6),imgUrl:'img/1984.jpg',content: 'A dystopian novel by George Orwell, published in 1949. It is set in a totalitarian society ruled by Big Brother.'},
        {id: 'bj5931', title: 'To Kill a Mockingbird', price: 12,rating:getRandInt(1,6),imgUrl:'img/the adventarus of lori ipsi.jpg',content: 'A novel by Harper Lee published in 1960. It is a coming-of-age story set in the American South during the 1930s.'},
        {id: 'bj5932', title: 'The Great Gatsby', price: 10,rating:getRandInt(1,6),imgUrl:'img/zorba the greek.jpg',content: 'A novel by F. Scott Fitzgerald published in 1925. It is set in the Jazz Age and tells the story of Jay Gatsby and his unrequited love for Daisy Buchanan.'},
    ]
}

function createBook(title, price ,rating) {
    const book = {
        id: makeId(),
        title,
        price: +price,
        imgUrl: 'img/default book cover.jpg',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rating
    };      
    gBooks.unshift(book);
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
        <h2 class="book-card-title">${book.title}</h2>
        <img class="book-card-img" src="${book.imgUrl}" />
        <p class="book-card-price">Price: ${book.price}$</p>
        <p class="book-txt">${book.content}</p>
        <p class="book-card-rating">Rating: ${book.rating} stars</p>`;
        

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
    const rating = +prompt('Enter book rating:(1 is the lowest, 5 is the highest)');
    if (isNaN(rating) || rating>5||rating<1) {
        alert('Invalid rating. Please enter a valid number between 1 to 5.');
        return false;
    }
    createBook(title, price, rating);
    return true;
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