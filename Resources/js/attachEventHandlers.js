define(function(require) {
  "use strict";

  return function(playlist) {
    var $ = require("jquery");
    $("#savePlaylistButton").click(savePlaylist);
    $("#openPlaylistButton").click(openPlaylist);
    $("#addSongButton").click(addMusicFileToPlayList);
    $("#playButton").click(playPlayList);
    $("#nextButton").click(nextSong);
    $("#previousButton").click(previousSong);

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
