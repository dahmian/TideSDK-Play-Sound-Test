require(["menu/create", "playlist", "savePlaylist", "addSongToPlaylist", "openPlaylist"], function() {
  requirejs.config({baseUrl: "js"});

  var playlistObject = require("playlist");
  var playlist = new playlistObject();

  require("menu/create")(playlist);

  document.getElementById("saveButton").onclick = savePlaylist;
  document.getElementById("openPlaylistButton").onclick = openPlaylist;
  document.getElementById("openButton").onclick = addMusicFileToPlayList;
  document.getElementById("playButton").onclick = playPlayList;
  document.getElementById("nextButton").onclick = nextSong;
  document.getElementById("previousButton").onclick = previousSong;

  function savePlaylist() {
    var save = require("savePlaylist");
    save(playlist);
  }

  function openPlaylist() {
    var open = require("openPlaylist");
    open(playlist);
  }

  function addMusicFileToPlayList() {
    var addSongToPlaylist = require("addSongToPlaylist");
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
});
