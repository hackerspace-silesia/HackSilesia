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
          short_name: "fp",
          logo: "fp.png",
          short_desc: "Jesteśmy firmą technologiczną założoną w 2000r., która z grupki przyjaciół przekształciła się w 750-osobowy zespół",
          url: "https://www.future-processing.pl/"
        },
        {
          name: "ClearCode",
          short_name: "cc",
          logo: "cc.png",
          short_desc: "Jesteśmy software housem o wyjątkowej historii - założonym przez rodowitych Ślązaków, którzy wystartowali z biznesem",
          url: "http://clearcode.cc"
        },
        {
          name: "Voucherify",
          short_name: "voucherify",
          logo: "voucherify.png",
          short_desc: "platforma dla programistów, ułatwiająca implementację kampanii promocyjnych opartych o kupony",
          url: "https://www.voucherify.io"
        }
    ], [
        {name: "Sii", logo: "sii.jpg", url: "https://sii.pl/"},
        {name: "Wasko", logo: "wasko.png", url: "https://www.wasko.pl/"},
        {name: "KatoDesk", logo: "katodesk.png", url: "http://katodesk.com/"},
        {name: "Dobre Ziele", logo: "dobre_ziele.png", url: "https://dobreziele.pl/"},
    ], [
        {name: "Soft Kraft", logo: "soft_kraft.jpg", url: "http://softkraft.co"},
        {name: "Idea Hub", logo: "idea_hub.png", url: "https://www.facebook.com/IdeaHubDlaPrzedsiebiorcow/"},
        {name: "Mestudent", logo: "mestudent.png", url: "http://www.mestudent.jobs"},
    ]
  ],
  partnerships: [
      [
          {name: "ChallengeRocket", logo: "challengerocket.png", url: "https://challengerocket.com/pl/"},
          {name: "Silesia Jug", logo: "silesia-jug.png", url: "http://silesia.jug.pl"},
          {name: "SoftwareHut", logo: "softwarehut.png", url: "http://softwarehut.com/"},
      ],
      [
          {name: "Koduj Dla Polski", logo: "kdp.png", url: "https://kodujdlapolski.pl/"},
          {name: "TVP Katowice", logo: "tvp.jpg", url: "https://katowice.tvp.pl/"},
          {name: "PLPUG", logo: "plpug.png", url: "https://plpug.org/"},
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

