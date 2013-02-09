define(function(require) {
  "use strict";

  return function playlistObject() {
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
        playlist[currentSong].onComplete(playNextSong);
      }
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
      stop();
      if (hasNextSong()) {
        currentSong++;
      } else {
        currentSong = 0;
      }
      play();
    }

    function playPrevious() {
      stop();
      if (hasPreviousSong()) {
        currentSong--;
      } else {
        currentSong = playlist.length - 1;
      }
      play();
    }

    function stop() {
      if (hasCurrentSong()) {
        playlist[currentSong].stop();
        currentSong = 0;
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
