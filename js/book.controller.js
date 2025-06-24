'use strict';

var gBooks

function onInit(){
    books();
    render()
}
function books(){
    gBooks = loadFromStorage('books');
    if (!gBooks || !gBooks.length) {
        gBooks = getBooks();
        saveToStorage('books', gBooks);
    }
}

function render(){
        var strHTMLs = '';
    const elBooks = document.querySelector('.book-list');
    gBooks.map(book => {
        strHTMLs += `<tr class="book">
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
    render();

}
function onUpdateBook(bookId){
    const newPrice = +prompt('Enter new price:');
    if(isNaN(newPrice)||newPrice <= 0){
        alert('Invalid price. Please enter a valid number greater than or equal to 0.');
        return
    }
    updateBook(bookId,newPrice);   
    saveToStorage('books', gBooks);
    render();
}

function onRemoveBook(bookId){
    removeBook(bookId);
    saveToStorage('books', gBooks);
    render();
}
function onAddBook(){
    addBook();
    saveToStorage('books', gBooks);
    render();
}