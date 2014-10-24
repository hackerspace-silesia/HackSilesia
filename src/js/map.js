$('document').ready(function () {
    var map = L.map('map')
        .setView([50.26405, 19.02030], 16);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    })
        .addTo(map);

    var popup = L.popup({
        className: 'map-popup-div',
        closeButton: false
    });
    popup.setContent(
        '<div style="color: #333;"><address><strong>Business Link Katowice<br />Nowe Katowickie Centrum Biznesu</strong><br />ul. Chorzowska 6<br />40-101 Katowice</address></div>'
    );

    L.marker([50.26405, 19.02030])
        .addTo(map)
        .bindPopup(popup)
        .openPopup();

});
