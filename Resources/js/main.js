require(["createFileMenu", "playlist"], function() {
  requirejs.config({baseUrl: "js"});

  var playlistObject = require("playlist");
  var playlist = new playlistObject();

  var createFileMenu = require("createFileMenu");
  createFileMenu(playlist);

  document.getElementById("saveButton").onclick = savePlaylist;
  document.getElementById("openButton").onclick = addMusicFileToPlayList;
  document.getElementById("playButton").onclick = playPlayList;
  document.getElementById("nextButton").onclick = nextSong;
  document.getElementById("previousButton").onclick = previousSong;

  function savePlaylist() {
    playlist.save();
  }

  function addMusicFileToPlayList() {
      Ti.UI.getCurrentWindow().openFileChooserDialog(fileSelectedCallback, {multiple: false, title: "Add music file to playlist", types: ["wav", "mp3"]})

      function fileSelectedCallback(filePathsArray) {
        if (filePathsArray.length === 0) {
          return;
        }
        var songPath = filePathsArray[0];
        playlist.addSongByPath(songPath);
      }
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
    playlist.next();
  }

  function previousSong() {
    playlist.previous();
  }
});
