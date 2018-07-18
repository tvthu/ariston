(function ($) {

    var video, buttoncontrol, container;

    video = document.getElementById('Video1');

    if (video == null)
        return;

    buttoncontrol = $('.play-button, .pause-button');
    container = buttoncontrol.closest('.background-video');

    buttoncontrol.on('click', function () {

        if (video.paused) {
            video.play();

        } else {
            video.pause();
        }
    });

    video.onplay = function () {
        container.removeClass('onstop');
        container.addClass('onplay');
    };

    video.onpause = function () {
        container.removeClass('onplay');
        container.addClass('onstop');
    }
})(jQuery);