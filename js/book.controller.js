'use strict';

var gBooks
var gFilterBy = ''
var gMsg = ''
function onInit(){
    books();
    render(gFilterBy)
}
function books(){
    gBooks = loadFromStorage('books');
    if (!gBooks || !gBooks.length) {
        gBooks = getBooks();
        saveToStorage('books', gBooks);
    }
}

function render(gFilterBy){
        var strHTMLs = '';
    const elBooks = document.querySelector('.book-list');
    const booksToFilter = filterBooks(gFilterBy);
    booksToFilter.map(book => {
        strHTMLs += `<tr class="table-row">
                    <td>${book.title}</td>
                    <td>${book.price}</td>
                    <td><button class="action read" onclick="onReadBook('${book.id}')">Read</button>
                     <button class="action update" onclick="onUpdateBook('${book.id}')">update</button> 
                     <button class="action delete" onclick=" onRemoveBook('${book.id}')">delete</button></td>
                </tr>`;
    })    
    elBooks.innerHTML = strHTMLs
}

function onReadBook(bookId){
    readBook(bookId);
    render(gFilterBy);
    gMsg = 'Book details loaded successfully!';
    showMessage(gMsg)

}
function onUpdateBook(bookId){
    const newPrice = +prompt('Enter new price:');
    if(isNaN(newPrice)||newPrice <= 0){
        alert('Invalid price. Please enter a valid number greater than or equal to 0.');
        return
    }
    updateBook(bookId,newPrice);   
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
    addBook();
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

