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
  }
};

// No ES6 is bad :(
config.fullDescription = config.title + ' ' + config.subtitle + ' to ' + config.description;

module.exports = config;
