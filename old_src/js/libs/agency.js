/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */
// jQuery for page scrolling feature - requires jQuery Easing plugin


$('document').ready(function(){
    $(function () {
        $('a.page-scroll').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 50
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.scrollspy-this',
        offset: 100
    });
    // Closes the Responsive Menu on Menu Item Click
    $('button.navbar-toggle').click(function () {
        var navigation = $('#bs-example-navbar-collapse-1');
        $('a.page-scroll').one('click', function(){
            navigation.hide();
        });
        navigation.toggle();
    });
});
