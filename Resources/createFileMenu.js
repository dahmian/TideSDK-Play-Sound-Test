define(function(require) {
  "use strict";

  return function createFileMenu(playList) {
    var menu = Ti.UI.createMenu();
    var fileMenu = menu.addItem("File");
    fileMenu.addItem("Add song to playlist", playList.add);
    var controlsMenu = menu.addItem("Controls");
    controlsMenu.addItem("Play", playList.play);
    Ti.UI.getCurrentWindow().setMenu(menu);
  }
});
