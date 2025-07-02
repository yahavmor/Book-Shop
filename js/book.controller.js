'use strict';

var gBooks
var gMsg = ''
var gExpensiveBooksCount = 0;
var gAverageBooksCount = 0;
var gCheapBooksCount = 0;
var gBookToEditId = null
const STORAGE_KEY = 'booksDb'

var gQueryOptions ={
    gFilterBy:{filterTitle:null,filterRating:null},
    gSortBy:{option:'all',dir:true},
    gPage:{idx:0,limit:3,totalPages:null}
}

 


function onInit(){
    initBooks();
    renderBooks()
}
function initBooks(){
    gBooks = loadFromStorage(STORAGE_KEY);
    if (!gBooks || !gBooks.length) {
        gBooks = getBooksDB();
        saveToStorage(STORAGE_KEY, gBooks);
    }
}

function renderBooks(){
    var strHTMLs = '';
    const elBooks = document.querySelector('.book-cards');
    showPageNumber()
    var books = getBooks()
    if(!books.length) elBooks.innerHTML = noMatch() 
    else {
        books = sortBy(books)
        strHTMLs = books.map(book =>printBook(book));
        elBooks.innerHTML = strHTMLs.join('');
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
    renderBooks();
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

function onSearch(){  
    gQueryOptions.gFilterBy.filterTitle = getInputValueTitle()
    gQueryOptions.gFilterBy.filterRating = getInputValueRating()
    renderBooks()
}

function filterBooks() {
    const filterTitle = gQueryOptions.gFilterBy.filterTitle
    const filterRating = gQueryOptions.gFilterBy.filterRating

    return gBooks.filter(book => {
        const matchTitle = !filterTitle || book.title.toLowerCase().includes(filterTitle);
        const matchRating = !filterRating || book.rating === +filterRating;
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
    renderBooks();
    elBookModal.close();
    showMessage(gMsg);
}
function onSortBy(){
    const elSortOptions = document.querySelector('.sort')
    const elAccending = document.querySelector('.sort-dir-acc')
    const elDeccending = document.querySelector('.sort-dir-decc')
    gQueryOptions.gSortBy.dir = elDeccending.checked ? false : true

    gQueryOptions.gSortBy.option = elSortOptions.value
    gQueryOptions.gPage.idx = 0
    renderBooks()
}

function onCloseBookEditModal(){
    
    const elModal = document.querySelector('.book-edit-modal')
    isAddMode ? clearTextInput() : null
    elModal.close()
}

function getBooks(){
    if(gQueryOptions.gFilterBy.filterRating||gQueryOptions.gFilterBy.filterTitle) return filterBooks() 
    else return sliceBooks()
}

function onNextPage(){

    if(gQueryOptions.gPage.totalPages-1===gQueryOptions.gPage.idx){

        gQueryOptions.gPage.idx=0

    }else gQueryOptions.gPage.idx++

 

    renderBooks()

 

}

function onPrevPage(){  

    if(!gQueryOptions.gPage.idx){

        gQueryOptions.gPage.idx= gQueryOptions.gPage.totalPages-1

    }else gQueryOptions.gPage.idx--

    renderBooks()

}


function getInputValueTitle(){
    const inputValue = document.querySelector('.input-title').value.toLowerCase()
    return inputValue
}
function getInputValueRating(){
    const inputValue = document.querySelector('.input-rating').value
    return +inputValue  
}
function noMatch(){
    return `<p class="empty-table-message">No Matching Books Were Found....</p>`;
}