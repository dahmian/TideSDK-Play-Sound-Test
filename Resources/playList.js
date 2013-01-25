define(function(require) {
  "use strict";

  return function playListObject() {
    var index = 0;
    var playList = [];

    this.play = play;
    this.add = add;

    function play() {
      /* Audio JS object did not work in Tide app, so using the TideSDK instead */
      if (index + 1 > playList.length) {
        return;
      }
      playList[index].play();
      playList[index].onComplete(playNextSong);
    }

    function playNextSong() {
      index++;
      play();
    }

    function add() {
      Ti.UI.getCurrentWindow().openFileChooserDialog(fileSelectedCallback, {multiple: false, title: "Open a music file", types: ["wav", "mp3"]})

      function fileSelectedCallback(filePathsArray) {
        if (filePathsArray.length === 0) {
          return;
        }
        var songPath = filePathsArray[0];
        var song = Ti.Media.createSound(songPath);
        playList.push(song);
      }
    }

    function pause() {
      playList[index].pause();
    }
  }
});
