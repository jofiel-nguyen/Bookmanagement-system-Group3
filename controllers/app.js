$(document).ready(function() {
    var placeHolder = '<img src="https://via.placeholder.com/150">';
    var searchData;

    $("#search").click(function() {
        $("#list-output").empty();
        searchData = $("#search-box").val();

        if (searchData === "" || searchData === null) {
            displayError();
        } else {
            searchBooks(searchData, function(response) {
                if (response.totalItems === 0) {
                    alert("No results, try again!");
                } else {
                    $("title").animate({ 'margin-top': '5px' }, 1000);
                    $(".book-list").css("visibility", "visible");
                    displayResults(response);
                }
            }, function() {
                alert("Something went wrong!");
            });
        }
        $("#search-box").val("");
    });
});
