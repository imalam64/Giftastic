$(document).ready(function(){
//Creating an array of topics on Star Wars
var topics = ["Boba Fett", "Harrison Ford", "Death Star", "Yoda", "Obi-Wan Kenobi", "Tatooine", "Storm Trooper", "Princess Amidala", "It's a Trap!",
"Endor", "Luke Skywalker", "Jabba the Hutt", "R2-D2", "The Phatom Menace", "George Lucas", "Han Solo"];

//Creating a function that renders the array into buttons
function renderButtons(){
    $('#searchButton').empty();

    for (var i = 0; i < topics.length; i++){
        var a = $("<button>");
        a.addClass('btn btn-info starWars');
        a.attr('search-name', topics[i]);
        a.text(topics[i]);
        $('#searchButton').append(a);
    }
};

renderButtons();

//Creating a click functions that utilizes the Giphy API to search based on the button name
//The function should search their database and pull 10 results 
//It will then populate those 10 images on to a grid
//It will also pull the image rating and display it above the image
//Finally it will have a play/pause functionality for the user

function theGIFSearcher(){ $('.starWars').on('click', function() {
$('#display').empty();

var searchIt = $(this).attr('search-name');
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
searchIt + "&api_key=tY3kykAKF4BORze5adGtAziQjfy0PYhz&limit=10";

$.ajax({
    url: queryURL,
    method: 'GET'
})

.then(function(response) {
    console.log(response)

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
        var starDiv = $('<div/>');
        var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
        var starImage = $('<img/>');
        starImage.addClass('anImg');
        starImage.attr('data-state', 'still');
        starImage.attr('src', results[i].images.fixed_height_still
        .url);
        starImage.attr('data-still', results[i].images.fixed_height_still.url)
        starImage.attr('data-animate', results[i].images.fixed_height.url)
        starDiv.append(p);
        starDiv.append(starImage);
        starDiv.prependTo($('#display'));
    }

    $('.anImg').on('click', function() {
        var state = $(this).attr('data-state'); 
        console.log(this);
        if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));               
        $(this).attr('data-state', 'animate');
        } else {
        $(this).attr('src', $(this).data('still'));                
        $(this).attr('data-state', 'still');
        }      
    });
});

})};

theGIFSearcher();

//Creating a function to handle a new button addittion
//Need to recall theGIFSearcher again after the addition of the button
$("#addTopic").on("click", function(event) {
    event.preventDefault();

    var topic = $('#topicInput').val().trim();
    if (topic == "") {
        alert("Enter a search term!");
        return false;
    }
    else{
    topics.push(topic);
    $('#topicInput').val('');
    renderButtons();
    theGIFSearcher();
    };
});

});