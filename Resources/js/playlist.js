define(function(require) {
  "use strict";

  return function playlistObject() {
    var currentSong = 0;
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
      if (typeof playlist[currentSong] === "undefined") {
        return;
      }
      playlist[currentSong].play();
      playlist[currentSong].onComplete(playNextSong);
    }

    function playNextSong() {
      currentSong++;
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
      playlist[currentSong].pause();
    }

    function next() {
      stop();
      if (hasNextSong()) {
        currentSong++;
        play();
      } else {
        currentSong = 0;
        play();
      }
    }

    function previous() {
      stop();
      if (hasPreviousSong()) {
        currentSong--;
        play();
      } else {
        currentSong = playlist.length - 1;
        play();
      }
    }

    function stop() {
      playlist[currentSong].stop();
      currentSong = 0;
    }

    function hasPreviousSong() {
      return (typeof playlist[currentSong - 1] !== "undefined");
    }

    function hasNextSong() {
      return (typeof playlist[currentSong + 1] !== "undefined");
    }
  }
});
