var resetBg;
var _bg = false;

var config = {
  title: 'HackSilesia #3',
  subtitle: 'For Better Communities',
  description: '24-godzinny hackathon łączący programistów, grafików, projektantów programowania, ale przede wszystkim – ludzi z pomysłami i energią do zmieniania kawałka świata na lepsze. Dołącz do nas!',
  fullDescription: '',
  getBackgroundClass: function() {
    if (resetBg) {
      clearTimeout(resetBg);
      resetBg = undefined;
    }
    resetBg = setTimeout(function() {
      _bg = false;
    }, 50);
    if (_bg) {
      _bg = false;
      return 'section-1';
    } else {
      _bg = true;
      return 'section-2';
    }
  },
  sponsors: [
    [
        {
          name: "Future Processing",
          logo: "fp.png",
          desc: "Jesteśmy firmą technologiczną założoną w 2000r., która z grupki przyjaciół przekształciła się w 750-osobowy zespół. Zajmujemy się tworzeniem oprogramowania dla klientów prowadzących działalność w różnych sektorach rynku. Od początku istnienia Future Processing chcieliśmy, aby FP było miejscem, w którym pracuje szczęśliwy, zintegrowany i zmotywowany zespół. Lubimy to, co robimy i chcemy to robić jak najlepiej.",
          short_desc: "Jesteśmy firmą technologiczną założoną w 2000r., która z grupki przyjaciół przekształciła się w 750-osobowy zespół",
          url: "https://www.future-processing.pl/"
        },
        {
          name: "ClearCode",
          logo: "cc.png",
          desc: "Jesteśmy software housem o wyjątkowej historii - założonym przez rodowitych Ślązaków, którzy wystartowali z biznesem we Wrocławiu, by po dobrych kilku latach podjąć decyzję o powrocie do korzeni - tak oto w 2014 roku powstało biuro Clearcode w Katowicach. W projektach stawiamy na specjalizację i konsekwentnie idziemy w Ad Tech, MarTech i analytics, dostarczając klientom skille techniczne i potężny zasób wiedzy branżowej. Z pragnienia szerzenia dobrych praktyk i prowokowania dyskusji wywodzą się nasze najlepsze inicjatywy, jak Ferajny czy Beer & Bacon, w ramach których dzielimy się wiedzą i wspólnie rozwijamy",
          short_desc: "Jesteśmy software housem o wyjątkowej historii - założonym przez rodowitych Ślązaków, którzy wystartowali z biznesem",
          url: "http://clearcode.cc"
        }
    ], [
        {name: "Sii", logo: "sii.jpg", url: "https://sii.pl/"},
        {name: "Wasko", logo: "wasko.png", url: "https://www.wasko.pl/"},
    ]
  ],
  partnerships: [ 
      [
          {name: "ChallengeRocket", logo: "challengerocket.png", url: "https://challengerocket.com/pl/"},
      ]
  ],
  partnership_offsets: {
      md: ['-', 4, 2, 1, 0],
      sm: ['-', 4, 1, 0, 0],
  }
};

// No ES6 is bad :(
config.fullDescription = config.title + ' ' + config.subtitle + ' to ' + config.description;

module.exports = config;

