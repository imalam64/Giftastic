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
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#searchButton').append(a);
        }
    };

    //Creating a function to handle a new button addittion
    $("#addTopic").on("click", function(event) {
        event.preventDefault();

        var topic = $('#topicInput').val().trim();

        topics.push(topic);

        renderButtons();
    });

    renderButtons();

    /* $('#searchButton').on('click', function() {
        var starWars = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + starWars + "&api_key=tY3kykAKF4BORze5adGtAziQjfy0PYhz&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    }) */
})