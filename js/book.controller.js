'use strict';

var gBooks
var gFilterBy = ''
var gMsg = ''
var gExpensiveBooksCount = 0;
var gAverageBooksCount = 0; 
var gCheapBooksCount = 0;
var STORAGE_KEY = 'books';
var gBookToEditId = null


function onInit(){
    initBooks();
    render(gFilterBy)
}
function initBooks(){
    gBooks = loadFromStorage('books');
    if (!gBooks || !gBooks.length) {
        gBooks = getBooks();
        saveToStorage(STORAGE_KEY, gBooks);
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
                <img src="${book.imgUrl}" alt="photo of ${book.title}"  class="book-card-img" />
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
    gBookToEditId = bookId
    const elBookModal = document.querySelector('.book-edit-modal');
    const book = gBooks.find(book => book.id === bookId);
    const title = elBookModal.querySelector('.book-name-input').value=`${book.title}`;
    const price = elBookModal.querySelector('.book-price-input').value=`${book.price}`;
    const rating = elBookModal.querySelector('.book-rating-input').value=`${book.rating}`; 
    elBookModal.showModal();
}

function onRemoveBook(bookId){
    removeBook(bookId);
    saveToStorage(STORAGE_KEY, gBooks);
    render(gFilterBy);
    gMsg = 'Book removed successfully!';
    showMessage(gMsg);
}
function onAddBook(){
    gBookToEditId = null
    clearTextInput()
    const elBookModal = document.querySelector('.book-edit-modal');
    elBookModal.showModal();
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

function onSaveBook(){
    const elBookModal = document.querySelector('.book-edit-modal');
    const title = elBookModal.querySelector('.book-name-input').value;
    const price = +elBookModal.querySelector('.book-price-input').value;
    const rating = +elBookModal.querySelector('.book-rating-input').value;
    const imgUrl = 'img/default book cover.jpg'
    

    if (!title || isNaN(price) || price < 0 || isNaN(rating) || rating < 1 || rating > 5 ) {
        alert('Please fill all fields correctly.');
        return;
    }
    if(gBookToEditId){
        const book = findBookById(gBookToEditId)
        book.title = title
        book.price = price
        book.rating = rating
        book.imgUrl= imgUrl
        saveToStorage(STORAGE_KEY, gBooks);
        gMsg = 'Book updated successfully!';


    }else{
        clearTextInput()
        createBook(title, price, rating, imgUrl);
        saveToStorage(STORAGE_KEY, gBooks);
        gMsg = 'Book added successfully!';

    }
    render(gFilterBy);
    elBookModal.close();
    showMessage(gMsg);
}

function onCloseBookEditModal(){
    
    const elModal = document.querySelector('.book-edit-modal')
    isAddMode ? clearTextInput() : null
    elModal.close()
}

