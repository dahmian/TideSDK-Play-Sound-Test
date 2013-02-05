define(function(require) {
  "use strict";

  return function createFileMenu(playList) {
    var menu = Ti.UI.createMenu();
    var fileMenu = menu.addItem("File");
    fileMenu.addItem("Add song to playlist", playList.add);
    fileMenu.addItem("Open playlist", playList.open);
    fileMenu.addItem("Save playlist", playList.save);
    var controlsMenu = menu.addItem("Controls");
    controlsMenu.addItem("Play", playList.play);
    controlsMenu.addItem("Next", playList.next);
    controlsMenu.addItem("Previous", playList.previous);
    Ti.UI.getCurrentWindow().setMenu(menu);
  }
});
