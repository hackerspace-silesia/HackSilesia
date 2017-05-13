(function(doc, win, $) {
  function getOffset(offset) {
    var newOffset = offset - 50;
    return newOffset > 0 ? newOffset : offset;
  }
  $(doc).ready(function() {
    $('.scrollspy a[href^="#"]').bind('click.smoothscroll', function(e) {
      e.preventDefault();
      var target = this.hash,
        $target = $(target),
        offset = $target.offset().top || 0;

      $('html, body').stop().animate({
        'scrollTop': getOffset(offset)
      }, 1500, 'swing', function() {
        win.location.hash = target;
      });
    });
    $(win).scroll(function() {
      if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
      } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
      }
    });
  });

})(document, window, jQuery);
