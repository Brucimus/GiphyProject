//variables
var animeList = ["dragonball", "gundam wing", "gundam seed", "pokemon", "digimon", "naruto", "full metal alchemist", "full metal panic"]

//clear button listings function
function clearButtons() {
    $("#listButtons").empty();
}

//clear displayed gifst function
function clearGifs() {
    $("#listGifs").empty();
}

//loop through animeList array for display
function displayButtons() {
    clearButtons();
    for (var i = 0; i < animeList.length; i++) {
        var buttonCreate = $("<button>" + animeList[i] + "</button>");
        buttonCreate.attr({
            "value" : animeList[i],
            "class" : "animeButton"
        });
        $("#listButtons").append(buttonCreate);
    }
}

displayButtons();
//on animeButton click
$(".animeButton").on("click", function() {
    //function specific variables
    var buttonValue = $(this).attr("value");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonValue +"&api_key=KVdYfEzpM2XtyY8DMGDjdoamhv13jNZt&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(data) {

        //clear gifs from display
        clearGifs();
        var results = data.data;

        //iterate through pulled gifs to display Ratings and Gifs
        for (var i = 0; i < results.length ; i++) {
            
            //create div to house a gif's properties
            var gifDiv = $("<div>");
            var gifRating = results[i].rating;
            var ratingDisplay = $("<p>").text("Rating: " + gifRating);            
            var animeImage = $("<img>");

            //source still and gif images
            animeImage.attr( {
                "src" : results[i].images.fixed_height_still.url,
                "active" : results[i].images.fixed_height.url,
                "still" : results[i].images.fixed_height_still.url,
                "status" : "still"
            });

            //append rating display
            gifDiv.append(ratingDisplay);

            //append gif image
            gifDiv.append(animeImage);

            //display div of gif properties
            $("#listGifs").append(gifDiv);
            // debugger;
        }
    });
})

//add new item to animeList on Click function