'use strict';

var gBooks
var gFilterBy = ''
var gMsg = ''
var gExpensiveBooksCount = 0;
var gAverageBooksCount = 0; 
var gCheapBooksCount = 0;


function onInit(){
    initBooks();
    render(gFilterBy)
}
function initBooks(){
    gBooks = loadFromStorage('books');
    if (!gBooks || !gBooks.length) {
        gBooks = getBooks();
        saveToStorage('books', gBooks);
    }
}

function render(gFilterBy){
        var strHTMLs = '';
    const elBooks = document.querySelector('.book-cards');
    const booksToFilter = filterBooks(gFilterBy);
    if (!booksToFilter.length) {
    elBooks.innerHTML = `<p class="empty-table-message">No Matching Books Were Found....</p>`;
    } else {
        booksToFilter.map(book => {
            strHTMLs += `
            <div class="book-card">
                <div class="book-card-title">${book.title}</div>
                <img src="${book.imgUrl}"  class="book-card-img" />
                <div class="book-card-price">Price:${book.price} $</div>
                <div class="book-card-rating">Rating:${book.rating} ⭐</div>
                <div class="book-card-actions">
                    <button class="action read" onclick="onReadBook('${book.id}')">Read</button>
                    <button class="action update" onclick="onUpdateBook('${book.id}')">Update</button>
                    <button class="action delete" onclick="onRemoveBook('${book.id}')">Delete</button>
                </div>
            </div>`;
        });
    elBooks.innerHTML = strHTMLs;
}

    
    showStats()
}

function onReadBook(bookId){
    readBook(bookId);
    render(gFilterBy);
    gMsg = 'Book details loaded successfully!';
    showMessage(gMsg)

}
function onUpdateBook(bookId){
    const isValid  = updateBook(bookId);
    if (!isValid) return;
    saveToStorage('books', gBooks);
    render(gFilterBy);
    gMsg = 'Book updated successfully!';
    showMessage(gMsg)
}

function onRemoveBook(bookId){
    removeBook(bookId);
    saveToStorage('books', gBooks);
    render(gFilterBy);
    gMsg = 'Book removed successfully!';
    showMessage(gMsg);
}
function onAddBook(){
    const isValid = addBook();
    if (!isValid) return;
    saveToStorage('books', gBooks);
    render(gFilterBy);
    gMsg = 'Book added successfully!';
    showMessage(gMsg);
}

function onSearch(input){
    gFilterBy = input.value.toLowerCase();
    render(gFilterBy);
}

function filterBooks(gFilterBy){
    if (!gFilterBy) return gBooks;
    return gBooks.filter(book => book.title.toLowerCase().includes(gFilterBy));  
}
function onResetSearch(){
    resetSearch();
    clearTextInput();
}

function showStats(){
    const elExpensiveBooksCount = document.querySelector('.expensive-books-count ');
    const elAverageBooksCount = document.querySelector('.average-books-count ');
    const elCheapBooksCount = document.querySelector('.cheap-books-count ');
    getStat();
    elExpensiveBooksCount.innerHTML = gExpensiveBooksCount;
    elAverageBooksCount.innerHTML = gAverageBooksCount;
    elCheapBooksCount.innerHTML = gCheapBooksCount;
}

