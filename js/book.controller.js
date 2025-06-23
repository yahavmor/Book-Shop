'use strict';

function onInit(){
    render()
}

function render(){
        const books = getBooks();
        var strHTMLs = '';
    const elBooks = document.querySelector('.book-list');
    books.map(book => {
        strHTMLs += `<tr class="book">
                    <td>${book.title}</td>
                    <td>${book.price}</td>
                    <td><button class="action read" onclick="onReadBook()">Read</button>
                     <button class="action update" onclick="onUpdateBook()">update</button> 
                     <button class="action delete" onclick="onDeleteBook()">delete</button></td>
                </tr>`;
    })    
    elBooks.innerHTML = strHTMLs
}

function onReadBook(){
    console.log('Reading book...');

}
function onUpdateBook(){
    console.log('Updating book...');
    

}
function onDeleteBook(){
    console.log('Deleting book...');

}