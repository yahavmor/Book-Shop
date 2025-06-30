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
    const elBooks = document.querySelector('.book-list');
    const booksToFilter = filterBooks(gFilterBy);
    if(!booksToFilter.length) elBooks.innerHTML = `<tr> <td class="empty-table-message">No Matching Books Were Found....</td></tr>`; 
        else{ booksToFilter.map(book => {
        strHTMLs += `<tr class="table-row">
                    <td class="table-collumn">${book.title}</td>
                    <td class="table-collumn">${book.price}</td>
                    <td class="table-collumn">${book.rating}</td>

                    <td class="table-collumn"><button class="action read" onclick="onReadBook('${book.id}')">Read</button>
                     <button class="action update" onclick="onUpdateBook('${book.id}')">update</button> 
                     <button class="action delete" onclick=" onRemoveBook('${book.id}')">delete</button></td>
                </tr>`;
    })
    elBooks.innerHTML = strHTMLs
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

