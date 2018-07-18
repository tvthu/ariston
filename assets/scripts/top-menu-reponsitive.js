(function ($) {
    var buttonmenu, menu, body, classToggled;

    buttonmenu = $('.space-middle');
    if (buttonmenu.length <= 0)
        return;

    menu = $('#primary-menu');
    body = $('body');
    classToggled = 'toggled';

    updatemenus(false);

    buttonmenu.on('click', function (e) {
        var that = $(this);
        if (body.hasClass(classToggled)) {
            updatemenus(false);
        } else {
            updatemenus(true);
        }
        body.toggleClass(classToggled);

    });

    menu.on('click', 'li', function () {
        if (body.hasClass(classToggled)){
            buttonmenu.trigger('click');
        }
    });

    function updatemenus(status) {
        buttonmenu.attr('aria-expanded', status);
        menu.attr('aria-expanded', status);
    }
})(jQuery);