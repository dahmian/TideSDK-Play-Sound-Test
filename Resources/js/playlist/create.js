define(function(require) {
  "use strict";

  return function() {
    var currentSong = 0;
    var playlist = [];

    this.play = play;
    this.pause = pause;
    this.addSongByPath = addSongByPath;
    this.importSongPaths = importSongPaths;
    this.exportPaths = exportPaths;
    this.playNext = playNext;
    this.playPrevious = playPrevious;
    this.stop = stop;

    function play() {
      if (hasCurrentSong()) {
        playlist[currentSong].play();
        playlist[currentSong].onComplete(playNext);
      }
    }

    function addSongByPath(path) {
      var song = Ti.Media.createSound(path);
      song.path = path;
      playlist.push(song);
    }

    function exportPaths() {
      var paths = [];
      for (var key in playlist) {
        paths.push(playlist[key].path);
      }
      return paths;
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

    function playNext() {
      if (hasNextSong()) {
        stop()
        currentSong++;
        play();
      }
    }

    function playPrevious() {
      if (hasPreviousSong()) {
        stop();
        currentSong--;
        play();
      }
    }

    function stop() {
      if (hasCurrentSong()) {
        playlist[currentSong].stop();
      }
    }

    function hasCurrentSong() {
      return (typeof playlist[currentSong] === "object");
    }

    function hasPreviousSong() {
      return (typeof playlist[currentSong - 1] !== "undefined");
    }

    function hasNextSong() {
      return (typeof playlist[currentSong + 1] !== "undefined");
    }
  }
});
