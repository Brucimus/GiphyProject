//variables
var animeList = ["dragonball", "gundam wing", "gundam seed", "pokemon", "digimon", "naruto", "full metal alchemist", "full metal panic"]

//clear button listings function
function displayButtons() {
    for (var i = 0; i < animeList.length; i++) {
        var buttonCreate = $("<button>" + animeList[i] + "</button>");
        buttonCreate.attr("value", animeList[i]);
        $("#listButtons").append(buttonCreate);
    }
}

displayButtons();
//clear displayed gifst function
function clearGifs() {
    $("#listGifs").empty();
}

//loop through animeList array for display

//on animeButton click
$(".animeButton").on("click", function() {
    //function specific variables
    var buttonValue = $(this).attr("value");


})

//add new item to animeList on Click function