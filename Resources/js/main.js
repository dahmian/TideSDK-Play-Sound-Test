require(["createFileMenu", "playList"], function() {
  requirejs.config({baseUrl: "js"});

  var playListObject = require("playList");
  var playList = new playListObject();

  var createFileMenu = require("createFileMenu");
  createFileMenu(playList);

  document.getElementById("saveButton").onclick = savePlaylist;
  document.getElementById("openButton").onclick = addMusicFileToPlayList;
  document.getElementById("playButton").onclick = playPlayList;
  document.getElementById("nextButton").onclick = nextSong;
  document.getElementById("previousButton").onclick = previousSong;

  function savePlaylist() {
    playList.save();
  }

  function addMusicFileToPlayList() {
    playList.add()
  }

  function playPlayList() {
    playList.play();
    this.src = "images/pause.png";
    this.onclick = pausePlayList;
  }

  function pausePlayList() {
    playList.pause();
    this.src = "images/play.png";
    this.onclick = playPlayList;
  }

  function nextSong() {
    playList.next();
  }

  function previousSong() {
    playList.previous();
  }
});
