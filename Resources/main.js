require([], function() {
  var playList = [];
  var menu = Ti.UI.createMenu();
  var fileMenu = menu.addItem("File");
  fileMenu.addItem("Add song to playlist", function() {addMusicFileToPlayList(playList)});
  Ti.UI.getCurrentWindow().setMenu(menu);

  /* Audio JS object did not work in Tide app, so using the TideSDK instead */
  var addFileButton = document.getElementById("openButton");
  var playButton = document.getElementById("playButton");

  addFileButton.onclick = function() {addMusicFileToPlayList(playList);};
  playButton.onclick = function() {playPlayList.call(this, playList, 0)};
  

  function addMusicFileToPlayList() {
    Ti.UI.getCurrentWindow().openFileChooserDialog(fileSelectedCallback, {multiple: false, title: "Open a music file", types: ["wav", "mp3"]})

    function fileSelectedCallback(filePathsArray) {
      if (filePathsArray.length === 0) {
        return;
      }
      var filePath = filePathsArray[0];
      playList.push((Ti.Media.createSound(filePath)));
    }
  }

  function playPlayList(playList, songIndex) {
    if (songIndex + 1 > playList.length) {
      return;
    }
    playList[songIndex].play();
    playList[songIndex].onComplete(function() {playPlayList.call(this, playList, songIndex + 1)});
    resetToPause.call(this);

    function resetToPause() {
      this.src = "pause.png";
      this.onclick = pauseMusic;
    }

    function pauseMusic() {
      playList[0].pause();
      resetToPlay.call(this);

      function resetToPlay() {
        this.src = "play.png";
        this.onclick = playPlayList;
      }
    }
  }
});
