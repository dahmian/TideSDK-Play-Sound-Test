require(["menu/create", "playlist/create", "playlist/save", "playlist/addSong", "playlist/open"], function() {
  requirejs.config({baseUrl: "js"});

  var playlistObject = require("playlist/create");
  var playlist = new playlistObject();

  require("menu/create")(playlist);

  document.getElementById("saveButton").onclick = savePlaylist;
  document.getElementById("openPlaylistButton").onclick = openPlaylist;
  document.getElementById("openButton").onclick = addMusicFileToPlayList;
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
});
