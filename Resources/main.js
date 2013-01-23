require([], function() {
  /* Audio JS object did not work in Tide app, so using the TideSDK instead */
  var playList = [];
  var openButton = document.getElementById("openButton");
  var playButton = document.getElementById("playButton");

  openButton.onclick = openMusicFile;
  playButton.onclick = function() {playMusic.call(this, 0)};
  

  function openMusicFile() {
    Ti.UI.getCurrentWindow().openFileChooserDialog(fileSelectedCallback, {multiple: false, title: "Open a music file", types: ["wav", "mp3"]})

    function fileSelectedCallback(filePathsArray) {
      if (filePathsArray.length === 0) {
        return;
      }
      var filePath = filePathsArray[0];
      playList.push((Ti.Media.createSound(filePath)));
    }
  }

  function resetToPlay() {
    this.src = "play.png";
    this.onclick = playMusic;
  }

  function resetToPause() {
    this.src = "pause.png";
    this.onclick = pauseMusic;
  }

  function playMusic(songNumber) {
    if (songNumber + 1 > playList.length) {
      return;
    }
    playList[songNumber].play();
    playList[songNumber].onComplete(function() {playMusic.call(this, songNumber + 1)});
    resetToPause.call(this);
  }

  function pauseMusic() {
    playList[0].pause();
    resetToPlay.call(this);
  }
});
