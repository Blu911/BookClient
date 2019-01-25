$('document').ready(function () {

    getAllBooks();

    $('#books').on('click', 'li', function () {
      $(this).next().slideToggle();
    });

});

function getBook(id) {
    $.ajax({
        url: 'http://localhost:8282/books'+'/'+id,
        type: 'GET',
        dataType: 'json'
    }).done(function (book) {
        console.log(book);
        // showMore(book);
    });
}




function getAllBooks() {
    $.ajax({
        url: 'http://localhost:8282/books',
        type: 'GET',
        dataType: 'json'
    }).done(function (books) {
        display(books)
    });
}


function display (books) {

    var ul =$('#books');

    for (var i = 0; i < books.length; i++) {
        var newLi = $('<li>').text(books[i].title).attr('data-id', books[i].id);
        var newDiv = $('<div>').text(books[i].author + " " + books[i].publisher).attr('data-id', books[i].id).hide();
        ul.append(newLi).append(newDiv);

    }


}


