define(function(require) {
  "use strict";

  return function(playlist) {
    document.getElementById("savePlaylistButton").onclick = savePlaylist;
    document.getElementById("openPlaylistButton").onclick = openPlaylist;
    document.getElementById("addSongButton").onclick = addMusicFileToPlayList;
    document.getElementById("playButton").onclick = playPlayList;
    document.getElementById("nextButton").onclick = nextSong;
    document.getElementById("previousButton").onclick = previousSong;

    function savePlaylist() {
      var save = require("playlist/save");
      save(playlist);
    }

    function openPlaylist() {
      var open = require("playlist/open");
      open(playlist);
    }

    function addMusicFileToPlayList() {
      var addSongToPlaylist = require("playlist/addSong");
      addSongToPlaylist(playlist);
    }

    function playPlayList() {
      playlist.play();
      this.src = "images/pause.png";
      this.onclick = pausePlayList;
    }

    function pausePlayList() {
      playlist.pause();
      this.src = "images/play.png";
      this.onclick = playPlayList;
    }

    function nextSong() {
      playlist.playNext();
    }

    function previousSong() {
      playlist.playPrevious();
    }
  }
});
