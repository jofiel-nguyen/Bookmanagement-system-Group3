$(document).ready(function() {
    var item, title, author, publisher, bookLink, bookImg
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var apiKey = "AIzaSyAZ6v0IOalMHcuZ1viSrXpalAP2TCUY4iA";
    var placeHolder = '<img src="https://via.placeholder.com/150">';
    var searchData;

    // listener for search button
    $("#search").click(function() {
        outputList.innerHTML = "";
        searchData = $("#search-box").val();

        if(searchData === "" || searchData === null) {
            displayError();
        } else {
            $.ajax({
                url: bookUrl + searchData,
                dataType: "json",
                success: function(response) {
                    console.log(response)
                    if(response.totalItems === 0) {
                        alert("no results, try again!")
                    } else {
                        $("title").animate({'margin-top': '5px'}, 1000);
                        $(".book-list").css("visibility", "visible");
                        displayResults(response);
                    }
                },
                error: function () {
                    alert("Something went wrong!");
                }
                });
        }
        $("search-box").val("");


    });
    // Add click event listener to cards
    // $(document).on("click", ".card", function() {
    //     var description = $(this).find(".description");
    //     description.slideToggle();
   
    // });

    // $(document).on("click", ".card", function() {
    //     var description = $(this).find(".description").text();
    //     localStorage.setItem("description", description);
    //     window.open("description.html", "_blank");
    // });

    $(document).on("click", ".card", function() {
        var card = $(this);
        var title = card.find(".card-title").text();
        var description = card.find(".description").text();
      
        $("#modal-title").text(title);
        $("#modal-description").text(description);
        $("#modal").show();
      });
      
      $(".close").click(function() {
        $("#modal").hide();
      });
      

    // $('#search-form').on('submit', function(event) {
    //     event.preventDefault();
    //     const searchData = $('#search-box').val().trim();

    //     if (!searchData || searchData === '') {
    //         alert('Search term cannot be empty');
    //         return;
    //     }

    //     const encodedSearchTerm = encodeURIComponent(searchData);
    //     const searchUrl = `/search?searchData=${encodedSearchTerm}`;

    //     window.open(searchUrl, '_blank');
    // });

    $("#home").click(function() {
        outputList.innerHTML = "";
    });

    function displayResults(response) {
        for(var i = 0; i < response.items.length; i+=2) {
            item = response.items[i];
            title1 = item.volumeInfo.title;
            author1 = item.volumeInfo.authors;
            publisher1 = item.volumeInfo.publisher;
            bookLink1 = item.volumeInfo.previewLink;
            bookIsbn1 = item.volumeInfo.industryIdentifiers[1].identifier;
            bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHolder;
            review1 = item.volumeInfo.averageRating;
            categories1 = item.volumeInfo.categories;
            description1 = item.volumeInfo.description;

            item2 = response.items[i+1];
            title2 = item2.volumeInfo.title;
            author2 = item2.volumeInfo.authors;
            publisher2 = item2.volumeInfo.publisher;
            bookLink2 = item2.volumeInfo.previewLink;
            bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier;
            bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHolder;
            review2 = item2.volumeInfo.averageRating;
            categories2 = item2.volumeInfo.categories;
            description2 = item2.volumeInfo.description;
            
            // output to output list
            outputList.innerHTML += '<div class= "row mt-4">' +
                    formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn1, review1, categories1, description1) + 
                    formatOutput(bookImg2, title2, author2, publisher2, bookLink2, bookIsbn2, review2, categories2, description2) +
                    '</div>';

                console.log(outputList);
        }
    }

    function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn, review, categories, description) {
        console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
        // var viewUrl = 'book.html?isbn='+bookIsbn;
        var viewUrl = bookLink;
        var htmlCard = `<div class="col lg-6">
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
                                    <p class="card-text">Average Rating: ${review}</p>
                                    <p class="card-text">Categories: ${categories ? categories.join(", ") : 'N/A'}</p>
                                    <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
                                    <p class="card-text description" style="display: none;">Description: ${description}</p>
                                </div>
                                <div id="reviews-${bookIsbn}" class="reviews">
                                    <h5 class="mt-4">Reviews</h5>
                                    <div id="reviews-list-${bookIsbn}" class="reviews-list"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>`;
        

    // Fetch ratings and reviews
    fetchRatingsAndReviews(bookIsbn);

        return htmlCard;
    }

    function fetchRatingsAndReviews(bookIsbn) {
        var ratingsUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${bookIsbn}&key=${apiKey}`;
    
        $.ajax({
          url: ratingsUrl,
          dataType: "json",
          success: function(response) {
            if (response.totalItems > 0) {
              var reviews = response.items[0].volumeInfo.reviews || [];
              displayReviews(reviews, bookIsbn);
            }
          },
          error: function() {
            console.log("Failed to fetch ratings and reviews.");
          }
        });
      }
    
      function displayReviews(reviews, bookIsbn) {
        var reviewsList = document.getElementById(`reviews-list-${bookIsbn}`);
    
        if (reviews.length === 0) {
          reviewsList.innerHTML = "<p>No reviews available.</p>";
          return;
        }
    
        var html = "";
        for (var i = 0; i < reviews.length; i++) {
          var review = reviews[i];
          var reviewHtml = `<div class="review">
            <p>${review.name}</p>
            <p>${review.rating} stars</p>
            <p>${review.text}</p>
          </div>`;
          html += reviewHtml;
        }
    
        reviewsList.innerHTML = html;
      }
    

    function displayError() {
        alert("search term cannot be empty");
    }
});