require(["createFileMenu", "playList"], function() {
  var playListObject = require("playList");
  var playList = new playListObject();

  var createFileMenu = require("createFileMenu");
  createFileMenu(playList);

  document.getElementById("openButton").onclick = addMusicFileToPlayList;
  document.getElementById("playButton").onclick = playPlayList;

  function addMusicFileToPlayList() {
    playList.add()
  }

  function playPlayList() {
    playList.play();
  }
});
