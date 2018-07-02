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

    //on animeButton click
    $(".animeButton").click(function() {
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
                var gifDiv = $("<div class='gifImages'>");
                var gifRating = results[i].rating;
                var ratingDisplay = $("<p>").text("Rating: " + gifRating);            
                var animeImage = $("<img>");

                //source still and gif images
                animeImage.attr( {
                    "src" : results[i].images.fixed_height_still.url,
                    "active" : results[i].images.fixed_height.url,
                    "still" : results[i].images.fixed_height_still.url,
                    "currentStatus" : "gifStill",
                    "class" : 'gifImages'
                });

                //append rating display
                gifDiv.append(ratingDisplay);

                //append gif image
                gifDiv.append(animeImage);

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
    $("#submittedValue").val("");
    displayButtons();

});

