define(function(require) {
  "use strict";

  return function createFileMenu(playList, addMusicFileToPlayList) {
    var menu = Ti.UI.createMenu();
    var fileMenu = menu.addItem("File");
    fileMenu.addItem("Add song to playlist", function() {addMusicFileToPlayList(playList)});
    Ti.UI.getCurrentWindow().setMenu(menu);
  }
});
