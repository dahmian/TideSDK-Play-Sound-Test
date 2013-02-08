define(function(require) {
  "use strict";

  return function playlistObject() {
    var currentSong = 0;
    var playlist = [];

    this.play = play;
    this.pause = pause;
    this.addSongByPath = addSongByPath;
    this.importSongPaths = importSongPaths;
    this.save = savePlayList;
    this.next = next;
    this.previous = previous;
    this.stop = stop;

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

    function addSongByPath(path) {
      var song = Ti.Media.createSound(path);
      song.path = path;
      playlist.push(song);
    }

      //TODO move dialog and save code out, leave string generation in
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

    function importSongPaths(pathArray) {
      var newPlaylist = [];
      for (var key in pathArray) {
        var song = Ti.Media.createSound(pathArray[key])
        song.path = pathArray[key];
        newPlaylist.push(song);
      }
      playlist = newPlaylist;
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
      if (typeof playlist[currentSong] === "object") {
        playlist[currentSong].stop();
        currentSong = 0;
      }
    }

    function hasPreviousSong() {
      return (typeof playlist[currentSong - 1] !== "undefined");
    }

    function hasNextSong() {
      return (typeof playlist[currentSong + 1] !== "undefined");
    }
  }
});
