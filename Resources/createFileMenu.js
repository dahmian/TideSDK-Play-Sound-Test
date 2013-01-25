define(function(require) {
  "use strict";

  return function createFileMenu(playList, addMusicFileToPlayList, playPlayList) {
    var menu = Ti.UI.createMenu();
    var fileMenu = menu.addItem("File");
    fileMenu.addItem("Add song to playlist", function() {addMusicFileToPlayList(playList)});
    var controlsMenu = menu.addItem("Controls");
    controlsMenu.addItem("Play", function() {playPlayList(playList, 0)});
    Ti.UI.getCurrentWindow().setMenu(menu);
  }
});
