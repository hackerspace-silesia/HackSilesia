(function () {

    var hackSilesia = {};
    for (var member in hackSilesia) delete myObject[member];

    window.hackSilesia = hackSilesia;

    (function () {
        'use strict';

        var scrollTo = window.scrollTo;

        if ('scrollBehavior' in document.documentElement.style) return;

        // store generally accessible frame id in case a new scroll animation is triggered before the previous
        // completes, we can cancel the previous scroll.
        var frame;

        function now() {
            return window.performance !== undefined && window.performance.now !== undefined ? window.performance.now() : Date.now !== undefined ? Date.now() : new Date().getTime();
        }

        // ease-in-out
        function ease(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        }

        function step(startX, startY, endX, endY, options) {
            var time = now();
            var elapsed = (time - options.startTime) / options.scrollTime;
            elapsed = elapsed > 1 ? 1 : elapsed;

            var value = ease(elapsed);
            var cx = startX + (endX - startX) * value;
            var cy = startY + (endY - startY) * value;

            scrollTo(cx, cy);

            if (cx === endX && cy === endY) {
                startX = startY = endX = endY = undefined;
                return;
            }

            frame = requestAnimationFrame(function () {
                step(startX, startY, endX, endY, options);
            });
        }

        function smoothScroll(x, y, scrollTime) {
            if (!scrollTime) scrollTime = 1000;
            var startX = window.pageXOffset;
            var startY = window.pageYOffset;

            var endX = x,
                endY = y;

            var options = {
                scrollTime: 1000,
                startTime: now()
            };

            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(function () {
                step(startX, startY, endX, endY, options);
            });
        }

        window.hackSilesia.smoothScroll = smoothScroll;
    }());

    var el = document.querySelectorAll('a.page-scroll');
    for (var i = 0; i < el.length; i++) {
        el[i].addEventListener('click', function (event) {
            var target = document.querySelector(event.target.hash);
            window.hackSilesia.smoothScroll(window.pageXOffset, target.offsetTop - 100, 2000);
            return false;
        });
    }
    document.querySelector('.navbar-collapse ul li a')
        .addEventListener('click', function () {
            document.querySelector('.navbar-toggle:visible');
        });
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

})();
