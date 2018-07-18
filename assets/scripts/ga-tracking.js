(function ($) {
    var trackingItems = 'a[data-tracking], button[data-tracking], input[data-tracking]';

    $(trackingItems).on('click', function (event) {
        var that = $(this);

        var eventLabel = that.data('tracking');

        ga('send', 'event', 'Internal browsing', 'click', eventLabel);
    });

})(jQuery);