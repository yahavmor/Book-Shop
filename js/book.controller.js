'use strict';

var gBooks
var gMsg = ''
var gExpensiveBooksCount = 0;
var gAverageBooksCount = 0;
var gCheapBooksCount = 0;
var gFilteredBooks  = null
var gBookToEditId = null
const STORAGE_KEY = 'booksDb'

var gQueryOptions ={

    gFilterBy:{filterTitle:null,filterRating:null},

    gSortBy:'all',

    gPage:{idx:0,size:4}

}


function onInit(){
    initBooks();
    render()
}
function initBooks(){
    gBooks = loadFromStorage('books');
    if (!gBooks || !gBooks.length) {
        gBooks = getBooks();
        saveToStorage(STORAGE_KEY, gBooks);
    }
}

function render(){

    var strHTMLs = '';

    const elBooks = document.querySelector('.book-cards');

    var books = gBooks.slice()

    gFilteredBooks = filterBooks(books);

    if (!gFilteredBooks.length) {

    elBooks.innerHTML = `<p class="empty-table-message">No Matching Books Were Found....</p>`;

    } else {

        const filterAndSortedBooks = sortBooks(gFilteredBooks)

        filterAndSortedBooks.map(book => {

            strHTMLs += `

            <div class="book-card">

                <div class="book-card-title">${book.title}</div>

                <img src="${book.imgUrl}"  class="book-card-img" />

                <div class="book-card-price">Price:${book.price} $</div>

                <div class="book-card-rating">Rating: ${'⭐'.repeat(book.rating)}</div>

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
    gMsg = 'Book details loaded successfully!';
    showMessage(gMsg)
}

function onUpdateBook(bookId){
    gBookToEditId = bookId
    const elBookModal = document.querySelector('.book-edit-modal');
    elBookModal.querySelector('span').innerHTML = 'Update'
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
    const elBookModal = document.querySelector('.book-edit-modal');
    elBookModal.querySelector('span').innerHTML = 'Add'
    gBookToEditId = null
    clearTextInput()
    elBookModal.showModal();
}

function onSearch(input){

    gQueryOptions.gFilterBy.filterTitle = input.value.toLowerCase();

    gQueryOptions.gFilterBy.filterRating = +input.value

    render()

}

function filterBooks(books) {

    const elInputTitle = document.querySelector('.input-title');

    const elInputRating = document.querySelector('.input-rating');

 

    const titleFilter = elInputTitle.value.toLowerCase();

    const ratingFilter = +elInputRating.value;

   

 

    return books.filter(book => {

        const matchTitle = !titleFilter||book.title.toLowerCase().includes(titleFilter);

        const matchRating = !ratingFilter||book.rating === ratingFilter;

        return matchTitle && matchRating;

    });

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
        gMsg = 'Book updated successfully!';


    }else{
        clearTextInput()
        createBook(title, price, rating, imgUrl);
        gMsg = 'Book added successfully!';

    }
    saveToStorage(STORAGE_KEY, gBooks);
    render();
    elBookModal.close();
    showMessage(gMsg);
}
function onSortBy(sort){

    gQueryOptions.gSortBy = sort.value

    render()

}

function onCloseBookEditModal(){
    
    const elModal = document.querySelector('.book-edit-modal')
    isAddMode ? clearTextInput() : null
    elModal.close()
}

