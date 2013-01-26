define(function(require) {
  "use strict";

  return function playListObject() {
    var index = 0;
    var playList = [];

    this.play = play;
    this.add = add;
    this.open = open;

    function play() {
      /* Audio JS object did not work in Tide app, so using the TideSDK instead */
      if (typeof playList[index] === "undefined") {
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
      Ti.UI.getCurrentWindow().openFileChooserDialog(fileSelectedCallback, {multiple: false, title: "Add music file to playlist", types: ["wav", "mp3"]})

      function fileSelectedCallback(filePathsArray) {
        if (filePathsArray.length === 0) {
          return;
        }
        var songPath = filePathsArray[0];
        var song = Ti.Media.createSound(songPath);
        playList.push(song);
      }
    }

    function open() {
      Ti.UI.getCurrentWindow().openFileChooserDialog(fileSelectedCallback, {multiple: false, title: "Open playlist"});

      function fileSelectedCallback(filePathsArray) {
        if (filePathsArray.length === 0) {
          return;
        }
        var path = filePathsArray[0];
        var fileStream = Ti.Filesystem.getFileStream(path);
        fileStream.open();
        var firstLine = fileStream.readLine().toString();
        fileStream.close();

        var song = Ti.Media.createSound(firstLine);
        playList.push(song);
      }
    }

    function pause() {
      playList[index].pause();
    }
  }
});
