define(function(require) {
  "use strict";

  return function playListObject() {
    var index = 0;
    var playList = [];

    this.play = play;
    this.pause = pause;
    this.add = add;
    this.open = open;
    this.next = next;
    this.previous = previous;

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
        var line;
        while(line = fileStream.readLine().toString()) {
          var song = Ti.Media.createSound(line);
          playList.push(song);
        }
        fileStream.close();
      }
    }

    function pause() {
      playList[index].pause();
    }

    function next() {
      stop();
      if (typeof playList[index + 1] === "undefined") {
        index = 0;
        play();
      } else {
        index++;
        play();
      }
    }

    function previous() {
      stop();
      if (typeof playList[index - 1] === "undefined") {
        index = playList.length - 1;
        play();
      } else {
        index--;
        play();
      }
    }

    function stop() {
      playList[index].stop();
    }
  }
});
