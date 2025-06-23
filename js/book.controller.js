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
                    <td><button>Read</button>
                     <button>update</button> 
                     <button>delete</button></td>
                </tr>`;
    })    
    elBooks.innerHTML = strHTMLs
}