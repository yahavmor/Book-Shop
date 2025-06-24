'use strict';

function onInit(){
    render()
}
var gBooks = getBooks();
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
    updateBook(bookId);
    render();
}

function onRemoveBook(bookId){
    removeBook(bookId);
    render();
}
function onAddBook(){
    addBook();
    render();
}