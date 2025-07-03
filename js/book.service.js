



'use strict';

function getBooksDB(){

   return [
        {
          id: makeId(), 
          title: "1984",
          price: 251.3,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780141036144-L.jpg",
          description: "A dystopian novel by George Orwell."
        },
        {
          id: makeId() ,
          title: "To Kill a Mockingbird",
          price: 23.6,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
          description: "A novel by Harper Lee set in the American South."
        },
        {
          id: makeId() ,
          title: "The Great Gatsby",
          price: 196.67,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
          description: "A story of Jay Gatsby and his love for Daisy."
        },
        {
          id: makeId(),
          title: "Brave New World",
          price: 344.7,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780060850524-L.jpg",
          description: "A futuristic society novel by Aldous Huxley."
        },
        {
          id: makeId() ,
          title: "Moby Dick",
          price: 241.76,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9781503280786-L.jpg",
          description: "The epic tale of Captain Ahab and the white whale."
        },
        {
          id: makeId() ,
          title: "Pride and Prejudice",
          price: 186.57,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
          description: "A romantic novel by Jane Austen."
        },
        {
          id: makeId() ,
          title: "The Catcher in the Rye",
          price: 226.78,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg",
          description: "Holden Caulfield’s journey through New York."
        },
        {
          id: makeId(),
          title: "Fahrenheit 451",
          price: 265.0,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9781451673319-L.jpg",
          description: "A dystopian novel about book burning."
        },
        {
          id: makeId(),
          title: "Jane Eyre",
          price: 416.27,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg",
          description: "A gothic romance by Charlotte Brontë."
        },
        {
          id: makeId(),
          title: "Animal Farm",
          price: 314.5,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780451526342-L.jpg",
          description: "A political allegory by George Orwell."
        },
        {
          id: makeId(),
          title: "The Hobbit",
          price: 493.1,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
          description: "Bilbo Baggins’ adventure in Middle-earth."
        },
        {
          id: makeId(),
          title: "War and Peace",
          price: 270.0,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780199232765-L.jpg",
          description: "A historical epic by Leo Tolstoy."
        },
        {
          id: makeId(),
          title: "Crime and Punishment",
          price: 236.7,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780140449136-L.jpg",
          description: "A psychological novel by Dostoevsky."
        },
        {
          id: makeId(),
          title: "The Odyssey",
          price: 267.7,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780140268867-L.jpg",
          description: "Homer’s epic journey of Odysseus."
        },
        {
          id: makeId(),
          title: "Les Misérables",
          price: 419.5,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780451419439-L.jpg",
          description: "Victor Hugo’s tale of redemption."
        },
        {
          id: makeId(),
          title: "The Brothers Karamazov",
          price: 337.19,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780374528379-L.jpg",
          description: "A philosophical novel by Dostoevsky."
        },
        {
          id: makeId(),
          title: "Wuthering Heights",
          price: 133.1,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg",
          description: "A tragic love story by Emily Brontë."
        },
        {
          id: makeId(),
          title: "Dracula",
          price: 48.26,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780486411095-L.jpg",
          description: "The classic vampire novel by Bram Stoker."
        },
        {
          id: makeId(),
          title: "Frankenstein",
          price: 190.67,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780486282114-L.jpg",
          description: "Mary Shelley’s tale of science and horror."
        },
        {
          id: makeId(),
          title: "The Divine Comedy",
          price: 296.9,
          rating: getRandInt(1,6),
          imgUrl: "https://covers.openlibrary.org/b/isbn/9780140448955-L.jpg",
          description: "Dante’s journey through Hell, Purgatory, and Paradise."
        }
      ];
      
  
      
      
    
}
function createBook(title, price, rating, imgUrl) {
    const book = {
        id: makeId() ,
        title,
        price: +price,
        imgUrl,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        rating
    };      
    gBooks.unshift(book);
}

function removeBook(bookId) {
    const bookIndex = gBooks.findIndex(book => book.id === bookId);
    gBooks.splice(bookIndex, 1);   
}


function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId);
    const elModal = document.querySelector('.book-details-modal');
    const elContent = elModal.querySelector('.dialog-content');

    elContent.innerHTML = `
        <h2 class="book-dialog-title">${book.title}</h2>
        <div class="dialog-body">    
        <img class="book-dialog-img" src="${book.imgUrl}" />
        <div class="dialog-stats">
        <p class="book-dialog-rating">Rating:  ${'⭐'.repeat(book.rating)} </p>
        <p class="book-dialog-price">Price: ${book.price}$</p>
        </div>
        </div>
        <p class="book-dialog-txt">${book.description}</p>`
    elModal.showModal();
}

function resetSearch(){
    const elTitleInput = document.querySelector('.input-title')
    const elRatingInput = document.querySelector('.input-rating')
    elRatingInput.value = 0
    elTitleInput.value = ''
    renderBooks();
}
function clearTextInput(){
    const elBookModal = document.querySelector('.book-edit-modal');
    const title = elBookModal.querySelector('.book-name-input').value='';
    const price = elBookModal.querySelector('.book-price-input').value='';
    const rating = elBookModal.querySelector('.book-rating-input').value=''; 
}
function showMessage(msg) {
    const elMessage = document.querySelector('.message-modal'); 
    elMessage.querySelector('.message-text span2').innerText = msg;
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
function sortBy(books){
    const dir = gQueryOptions.gSortBy.dir? -1 : 1
    switch (gQueryOptions.gSortBy.option){
        case 'all': return books
        case 'title':return books.sort((a, b) => (a.title.localeCompare(b.title))*dir);
        case 'rating': return books.sort((a,b)=>(a.rating-b.rating)*dir)
        case 'price': return books.sort((a,b)=>(a.price-b.price)*dir)
    }

}
function showPageNumber(){
    const elPageNum = document.querySelector('.page-num');
    const elPageNumber = elPageNum.querySelector('span');
    elPageNumber.innerHTML = gQueryOptions.gPage.idx+1
}

function printBook(book){
    return `
                <div class="book-card" onClick="onReadBook('${book.id}')">
                <div class="book-card-title">${book.title}</div>
                <img src="${book.imgUrl}"  class="book-card-img" />
                <div class="book-card-price">Price:${book.price} $</div>
                <div class="book-card-rating">Rating: ${'⭐'.repeat(book.rating)}</div>
                <div class="book-card-actions">
                <button class="action read" onclick="onReadBook('${book.id}')">Read</button>
                <button class="action update" onclick="event.stopPropagation() ;onUpdateBook('${book.id}')">Update</button>
                <button class="action delete" onclick="event.stopPropagation() ;onRemoveBook('${book.id}')">Delete</button>
                </div>
            </div>`;
}

function sliceBooks(){
    const books = gBooks.slice()
    const startIdx = gQueryOptions.gPage.idx * gQueryOptions.gPage.limit
    const endIdx = startIdx + gQueryOptions.gPage.limit
    gQueryOptions.gPage.totalPages = Math.ceil(books.length / gQueryOptions.gPage.limit )  
    return books.slice(startIdx,endIdx)
}


function renderBooksTable(books) {
    const elTableBody = document.querySelector('.book-list');
    if (!books.length) {
        elTableBody.innerHTML = `<tr><td>No Matching Books Were Found...</td></tr>`;
        return;
    }

    const strHTMLs = books.map(book => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price} $</td>
            <td>${'⭐'.repeat(book.rating)}</td>
            <td>
                <button class="action read" onclick="onReadBook('${book.id}')">Read</button>
                <button class="action update" onclick="onUpdateBook('${book.id}')">Update</button>
                <button class="action delete" onclick="onRemoveBook('${book.id}')">Delete</button>
            </td>
        </tr>
    `);
    elTableBody.innerHTML = strHTMLs.join('');
}




'use strict';

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function makeId(){
    var text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function findBookById(bookId){
    return gBooks.find(book => book.id === bookId);
}


