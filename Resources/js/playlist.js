define(function(require) {
  "use strict";

  return function playlistObject() {
    var index = 0;
    var playlist = [];

    this.play = play;
    this.pause = pause;
    this.add = addSong;
    this.open = openPlaylist;
    this.save = savePlayList;
    this.next = next;
    this.previous = previous;

    function play() {
      /* Audio JS object did not work in Tide app, so using the TideSDK instead */
      if (typeof playlist[index] === "undefined") {
        return;
      }
      playlist[index].play();
      playlist[index].onComplete(playNextSong);
    }

    function playNextSong() {
      index++;
      play();
    }

    function addSong() {
      Ti.UI.getCurrentWindow().openFileChooserDialog(fileSelectedCallback, {multiple: false, title: "Add music file to playlist", types: ["wav", "mp3"]})

      function fileSelectedCallback(filePathsArray) {
        if (filePathsArray.length === 0) {
          return;
        }
        var songPath = filePathsArray[0];
        var song = Ti.Media.createSound(songPath);
        song.path = songPath;
        playlist.push(song);
      }
    }

    function savePlayList() {
      Ti.UI.getCurrentWindow().openSaveAsDialog(saveLocationSelectedCallback);

      function saveLocationSelectedCallback(savePathArray) {
        if (savePathArray.length === 0) {
          return;
        }
        var savePath = savePathArray[0];
        var saveFile = Ti.Filesystem.getFile(savePath);
        var saveFileStream = saveFile.open(Ti.Filesystem.MODE_WRITE);
        for (var key in playlist) {
          saveFileStream.writeLine(playlist[key].path);
        }
        saveFileStream.close();
      }
    }

    function openPlaylist() {
      Ti.UI.getCurrentWindow().openFileChooserDialog(fileSelectedCallback, {multiple: false, title: "Open playlist"});

      function fileSelectedCallback(filePathsArray) {
        if (filePathsArray.length === 0) {
          return;
        }
        stop();
        var path = filePathsArray[0];
        var fileStream = Ti.Filesystem.getFileStream(path);
        fileStream.open();
        var line;
        while(line = fileStream.readLine().toString()) {
          var song = Ti.Media.createSound(line);
          playlist.push(song);
        }
        fileStream.close();
      }
    }

    function pause() {
      playlist[index].pause();
    }

    function next() {
      stop();
      if (hasNextSong()) {
        index++;
        play();
      } else {
        index = 0;
        play();
      }
    }

    function previous() {
      stop();
      if (hasPreviousSong()) {
        index--;
        play();
      } else {
        index = playlist.length - 1;
        play();
      }
    }

    function stop() {
      playlist[index].stop();
      index = 0;
    }

    function hasPreviousSong() {
      return (typeof playlist[index - 1] !== "undefined");
    }

    function hasNextSong() {
      return (typeof playlist[index + 1] !== "undefined");
    }
  }
});
