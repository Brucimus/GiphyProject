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
    debugger;
    });
})

//add new item to animeList on Click function