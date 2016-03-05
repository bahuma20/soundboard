// Render The List
var source = document.querySelector('#entry-template').innerHTML;
var template = Handlebars.compile(source);
var data = {
 entries: [
   {
     title: 'Baze weint',
     file: '01_baze_weint.mp3'
   },
   {
     title: 'Ejtz is schee woarm',
     file: '02_ejtz_is_schee_woarm.mp3'
   },
   {
     title: 'Etz kummt d\' Sonne',
     file: '03_etz_kummt_d_sonne.mp3'
   },
   {
     title: 'Göi',
     file: '04_goei.mp3'
   },
   {
     title: 'Happy Birthday',
     file: '05_happy_birthday.mp3'
   },
   {
     title: 'Hod da Baze gsogt',
     file: '06_hod_da_baze_gsogt.mp3'
   },
   {
     title: 'Is cool',
     file: '07_is_cool.mp3'
   },
   {
     title: 'Mei der Baze',
     file: '08_mei_der_baze.mp3'
   },
   {
     title: 'Ruhe!',
     file: '09_ruhe.mp3'
   },
   {
     title: 'Spinnts wieder, göi',
     file: '10_spinnts_wieder_goei.mp3'
   }
 ]
};
var html = template(data);

var target = document.querySelector('.page-content');
target.innerHTML = html;


var App = {
  setPlayButtonActive: function(button) {
    button.className = button.className + ' mdl-button--colored';
    button.children[0].innerHTML = 'stop';
    button.dataset.playing = true;
  },
  setAllPlayButtonsInactive: function() {
    for (var j=0; j < playButtons.length; j++) {
      playButtons[j].className = playButtons[j].className.replace(' mdl-button--colored', '');
      playButtons[j].children[0].innerHTML = 'play_arrow';
      playButtons[j].dataset.playing = false;
    }
  },
  player: null,
  playAudioFile: function(name) {
    this.player.children[0].setAttribute('src', 'data/' + name);
    this.player.load();
    this.player.play();
  },
  stopPlaying: function() {
    this.player.pause();
  }
};

App.player = document.querySelector('#audio-player');

App.player.addEventListener('ended', function() {
  App.setAllPlayButtonsInactive();
});

// Play Buttons
var playButtons = document.querySelectorAll('.entry .play-button');

for (var i=0; i < playButtons.length; i++) {
  playButtons[i].addEventListener('click', function(e) {
    console.log(this.dataset.playing);
    if (this.dataset.playing != "true") {
      App.setAllPlayButtonsInactive();
      App.setPlayButtonActive(this);
      App.playAudioFile(this.dataset.file);
    } else {
      App.stopPlaying();
      App.setAllPlayButtonsInactive();
    }

  });
}
