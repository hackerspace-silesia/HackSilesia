
var config = {
  _bg: false,
  title: 'HackSilesia #3',
  subtitle: 'For Better Communities!',
  description: '24-godzinny hackathon łączący programistów, grafików, projektantów programowania, ale przede wszystkim – ludzi z pomysłami i energią do zmieniania kawałka świata na lepsze. Dołącz do nas!',
  fullDescription: '',
  getBackgroundClass: function() {
    if (config._bg) {
      config._bg = false;
      return 'section-1';
    } else {
      config._bg = true;
      return 'section-2';
    }
  }
};

// No ES6 is bad :(
config.fullDescription = config.title + ' ' + config.subtitle + ' to ' + config.description;

module.exports = config;
