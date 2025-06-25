'use strict';

function getBooks(){
    return [
        {id: 'bj5930', title: '1984', price: 14,imgUrl:'https://example.com/1984.jpg'},
        {id: 'bj5931', title: 'To Kill a Mockingbird', price: 12,imgUrl:'https://example.com/to-kill-a-mockingbird.jpg'},
        {id: 'bj5932', title: 'The Great Gatsby', price: 10,imgUrl:'https://example.com/the-great-gatsby.jpg'},
    ]
}

function createBook(title, price) {
    const book = {
        id: makeId(),
        title,
        price: +price,
        imgUrl: `https://example.com/${title}.jpg` 
    };      
    gBooks.push(book);
}

function removeBook(bookId) {
    const bookIndex = gBooks.findIndex(book => book.id === bookId);
    gBooks.splice(bookIndex, 1);   
}
function updateBook(bookId,newPrice) {
    const book = gBooks.find(book => book.id === bookId);
    book.price = newPrice; 
}

function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId);
    const elModal = document.querySelector('.book-details-modal');
    const elDetails = document.querySelector('pre')
    elDetails.innerHTML = JSON.stringify(book, null, 2);
    elModal.showModal()
}
function addBook() {
    const title = prompt('Enter book title:');
    if (!title) {
        alert('Title cannot be empty');
        return;
    }
    const price = prompt('Enter book price:');
    if (isNaN(price) || price < 0) {
        alert('Invalid price. Please enter a valid number greater than or equal to 0.');
        return;
    }
    createBook(title, price);

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
