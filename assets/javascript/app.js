//variables
var animeList;
if (!localStorage.getItem("localAnimeList")) {
    animeList = ["dragonball", "gundam wing", "gundam seed", "pokemon", "digimon", "naruto", "full metal alchemist", "full metal panic"]
    localStorage.setItem("localAnimeList", JSON.stringify(animeList));
} else {
    animeList = JSON.parse(localStorage.getItem("localAnimeList"));
}

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
    var tempList = JSON.parse(localStorage.getItem("localAnimeList"));
    clearButtons();
    for (var i = 0; i < tempList.length; i++) {
        var buttonCreate = $("<button>" + tempList[i] + "</button>");
        buttonCreate.attr({
            "value" : tempList[i],
            "class" : "animeButton"
        });
        $("#listButtons").append(buttonCreate);
    }

    //on animeButton click
    $(".animeButton").click(function() {
        //function specific variables
        var buttonValue = $(this).attr("value");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="
            + buttonValue +
            "&api_key=KVdYfEzpM2XtyY8DMGDjdoamhv13jNZt&limit=10";

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
                var randomNumber = Math.floor(Math.random() * results.length);
                var gifDiv = $("<div class='gifImages'>");
                var gifRating = results[randomNumber].rating;
                var ratingDisplay = $("<p>").text("Rating: " + gifRating);            
                var animeImage = $("<img>");

                //source still and gif images
                animeImage.attr( {
                    "src" : results[randomNumber].images.fixed_height_still.url,
                    "active" : results[randomNumber].images.fixed_height.url,
                    "still" : results[randomNumber].images.fixed_height_still.url,
                    "currentStatus" : "gifStill",
                    "class" : 'gifImages'
                });

                //append gif image
                gifDiv.append(animeImage);

                //append rating display
                gifDiv.append(ratingDisplay);

                //display div of gif properties
                $("#listGifs").append(gifDiv);
            }

            //play and stop gifs
            $(".gifImages").click(function() {
                var gifStatus = $(this).attr("currentStatus");

                if (gifStatus === "gifStill") {
                    $(this).attr("src", $(this).attr("active"));
                    $(this).attr("currentStatus","gifActive");
                } else if (gifStatus === "gifActive") {
                    $(this).attr("src", $(this).attr("still"));
                    $(this).attr("currentStatus","gifStill");
                }
            });
        });
    });
}

displayButtons();

//add new item to animeList on Click function
$("#submitButton").click(function (event) {
    event.preventDefault();
    var inputVal = $("#submittedValue").val();
    animeList.push(inputVal);
    localStorage.setItem("localAnimeList", JSON.stringify(animeList));
    $("#submittedValue").val("");
    displayButtons();

});

