function displayResults(response) {
    var outputList = $("#list-output");
    outputList.empty();

    for (var i = 0; i < response.items.length; i += 2) {
        var item = response.items[i];
        var title1 = item.volumeInfo.title;
        var author1 = item.volumeInfo.authors;
        var publisher1 = item.volumeInfo.publisher;
        var bookLink1 = item.volumeInfo.previewLink;
        var bookIsbn1 = item.volumeInfo.industryIdentifiers[1].identifier;
        var bookImg1 = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : placeHolder;

        var item2 = response.items[i + 1];
        var title2 = item2.volumeInfo.title;
        var author2 = item2.volumeInfo.authors;
        var publisher2 = item2.volumeInfo.publisher;
        var bookLink2 = item2.volumeInfo.previewLink;
        var bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier;
        var bookImg2 = item2.volumeInfo.imageLinks ? item2.volumeInfo.imageLinks.thumbnail : placeHolder;

        var outputHTML = '<div class="row mt-4">' +
            formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn1) +
            formatOutput(bookImg2, title2, author2, publisher2, bookLink2, bookIsbn2) +
            '</div>';

        outputList.append(outputHTML);
    }
}

function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
    var viewUrl = 'book.html?isbn=' + bookIsbn;
    var htmlCard = `<div class="col-lg-6">
        <div class="card" style="">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${bookImg}" class="card-img" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">Author: ${author}</p>
                        <p class="card-text">Publisher: ${publisher}</p>
                        <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    return htmlCard;
}


function displayError() {
    alert("Search term cannot be empty");
}
