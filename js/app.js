$('document').ready(function () {

    getAllBooks();

    $('#books').on('mouseover', 'div', function () {
        var id = $(this).data('id');
        getBook(id);

    });

    addBook();
});

var Book = function (id, isbn, title, author, publisher, type) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.type = type;
};

function getBook(id) {
    $.ajax({
        url: 'http://localhost:8080/books' + '/' + id,
        type: 'GET',
        dataType: 'json'
    }).done(function (book) {
        showMore(book);
    });

}

function getAllBooks() {
    $.ajax({
        url: 'http://localhost:8080/books',
        type: 'GET',
        dataType: 'json'
    }).done(function (books) {
        display(books)
    });
}

function display(books) {

    var divBooks = $('#books');

    for (var i = 0; i < books.length; i++) {
        var book = $('<div>').attr('data-id', books[i].id);
        var ul = $('<ul>');
        var newLi = $('<li>').text(books[i].title);
        ul.append(newLi);
        var button = $('<button>').text('usuń');
        addEvent(button);
        book.append(ul).append(button);
        divBooks.append(book);
    }

}

function showMore(book) {
    var ul = $('div[data-id=' + book.id + ']').find('ul');
    if (ul.find('li').length == 1) {
        var li1 = $('<li>').text(book.isbn);
        var li2 = $('<li>').text(book.author);
        var li3 = $('<li>').text(book.publisher);
        var li4 = $('<li>').text(book.type);
        ul.append(li1).append(li2).append(li3).append(li4);
    }
}

function addBook() {
    var submit = $('input[type=submit]');
    submit.on('click', function () {
        event.preventDefault();
        var formData = $("form").serializeArray();

        var book = new Book();

        jQuery.each(formData, function (i, field) {
            book[field.name] = field.value;
        });
        var data = JSON.stringify(book);
        saveBook(data);

    });
}

function saveBook(book) {
    $.ajax({
        url: 'http://localhost:8080/books',
        type: 'POST',
        data: book,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function () {
        location.reload();
    }).fail(function (xhr, status, err) {
        console.log(xhr);
        console.log(status);
        console.log(err);
    });

}

function deleteBook(id) {
    $.ajax({
        url: 'http://localhost:8080/books' + '/' + id,
        type: 'DELETE',
        dataType: 'json'
    }).done(function () {
        location.reload();
        console.log('Ksiązka o id= ' + id + ' została usunieta');
    });

}

function addEvent(button) {
    button.on("click", function () {
        event.stopPropagation();
        var id = $(this).closest('div[data-id]').data('id');

        deleteBook(id);
    })

}
