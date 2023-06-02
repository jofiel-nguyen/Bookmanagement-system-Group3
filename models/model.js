function searchBooks(searchData, successCallback, errorCallback) {
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var apiKey = "AIzaSyAZ6v0IOalMHcuZ1viSrXpalAP2TCUY4iA"; // Replace with your actual API key

    $.ajax({
        url: bookUrl + searchData + "&key=" + apiKey,
        dataType: "json",
        success: function(response) {
            successCallback(response);
        },
        error: function() {
            errorCallback();
        }
    });
}
