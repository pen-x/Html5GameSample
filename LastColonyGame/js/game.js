$(window).load(function() {
    game.init();
});

var game = {
    // Start preloading assets
    init: function() {
        loader.init();

        $('.gamelayer').hide();
        $('#gamestartscreen').show();
    },
}
