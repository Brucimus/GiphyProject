//check if anime list variable available on local storage
var animeList;
if (!localStorage.getItem("localAnimeList")) {
    animeList = ["dragonball", "gundam wing", "gundam seed", "pokemon", "digimon", "naruto", "full metal alchemist", "full metal panic"]
    localStorage.setItem("localAnimeList", JSON.stringify(animeList));
} else {
    animeList = JSON.parse(localStorage.getItem("localAnimeList"));
}

//check if favorite anime list available on local storage
var favoriteAnimesList;
if (!localStorage.getItem("favoriteLocalAnimeList")) {
    favoriteAnimesList = [];
    localStorage.setItem("favoriteLocalAnimeList", JSON.stringify(favoriteAnimesList));
} else {
    favoriteAnimesList = JSON.parse(localStorage.getItem("favoriteLocalAnimeList"));    
}

//clear button listings function
function clearButtons() {
    $("#listButtons").empty();
}

//clear displayed gifst function
function clearGifs() {
    $("#listGifs").empty();
}

//clear favorites container
function clearFavorites() {
    $("#favoritesContainer").empty();
}

//play pause gif function
function playPause() {
    $(".gifActual").click(function() {
        var gifStatus = $(this).attr("currentStatus");

        if (gifStatus === "gifStill") {
            $(this).attr("src", $(this).attr("active"));
            $(this).attr("currentStatus","gifActive");
        } else if (gifStatus === "gifActive") {
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("currentStatus","gifStill");
        }
        // debugger;
    });
}

//add to favorites
function addToFavorites() {
    $(".favoriteButton").click(function() {
        event.preventDefault();
        favoriteAnimesList.push($(this).attr("value"));
        localStorage.setItem("favoriteLocalAnimeList", JSON.stringify(favoriteAnimesList));
        displayFavoriteGifs();
    })
}

//display favorites
function displayFavoriteGifs() {
    clearFavorites();

    for (var i = 0; i < favoriteAnimesList.length ; i++) {
        var queryURL = "https://api.giphy.com/v1/gifs/"
                + favoriteAnimesList[i] +
                "?api_key=KVdYfEzpM2XtyY8DMGDjdoamhv13jNZt";   
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(data) {
            var results = data.data;
            var gifDiv = $("<div class='imageContainer'>");
            var gifRating = results.rating;
            var gifTitle = results.title;
            var ratingDisplay = $("<p>").text("Rating: " + gifRating); 
            var titleDisplay = $("<p>").text("Title: " + gifTitle);           
            var animeImage = $("<img>");

            //source still and gif images
            animeImage.attr( {
                "src" : results.images.fixed_height.url,
                "class" : 'gifActual'
            });

            //append gif image
            gifDiv.append(animeImage);
            
            //append gif title
            gifDiv.append(titleDisplay);

            //append rating display
            gifDiv.append(ratingDisplay);


            //display div of gif properties
            $("#favoritesContainer").append(gifDiv);
            
        });
    }
}

displayFavoriteGifs();

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
        event.preventDefault();
        //function specific variables
        var buttonValue = $(this).attr("value");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="
            + buttonValue +
            "&api_key=KVdYfEzpM2XtyY8DMGDjdoamhv13jNZt";
        
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(data) {

            //clear gifs from display
            clearGifs();
            var results = data.data;

            //iterate through pulled gifs to display Ratings and Gifs
            for (var i = 0; i < 10 ; i++) {
                
                //create div to house a gif's properties
                var randomNumber = Math.floor(Math.random() * results.length);
                var gifDiv = $("<div class='imageContainer'>");
                var gifRating = results[randomNumber].rating;
                var gifTitle = results[randomNumber].title;
                var ratingDisplay = $("<p>").text("Rating: " + gifRating); 
                var titleDisplay = $("<p>").text("Title: " + gifTitle);           
                var animeImage = $("<img>");
                var favButton = $("<button>Favorite</button>");

                //source still and gif images
                animeImage.attr( {
                    "src" : results[randomNumber].images.fixed_height_still.url,
                    "active" : results[randomNumber].images.fixed_height.url,
                    "still" : results[randomNumber].images.fixed_height_still.url,
                    "currentStatus" : "gifStill",
                    "class" : 'gifActual'
                });

                //favButton add class
                favButton.addClass("favoriteButton");
                favButton.attr("value", results[randomNumber].id);

                //append gif image
                gifDiv.append(animeImage);
                
                //append gif title
                gifDiv.append(titleDisplay);

                //append rating display
                gifDiv.append(ratingDisplay);

                //append favorite button
                gifDiv.append(favButton);

                //display div of gif properties
                $("#listGifs").append(gifDiv);
            }

            //add to favorites section
            addToFavorites();

            //play and stop gifs
            playPause();
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

