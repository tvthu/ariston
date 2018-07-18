(function ($) {
    var buttons;

    buttons = $('.button-showup .fab-button');

    if (buttons.length > 0 ){
        buttons.on('click', function (e) {
            var that = $(this);

            var host = $('.prod-info.active');


            that.closest('.prod-info').addClass('active animated fadeInUp');

            host.removeClass('active animated fadeInUp');
        });
    }

    $('.carusel-container').slick({
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    prevArrow: '<span class="slick-prev"><i class="material-icons">arrow_back</i></span>',
                    nextArrow: '<span class="slick-next"><i class="material-icons">arrow_forward</i></span>',
                    arrows: true,
                    slidesToShow: 1
                }
            }
        ]
    });

})(jQuery);