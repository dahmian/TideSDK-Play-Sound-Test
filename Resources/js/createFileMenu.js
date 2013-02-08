define(function(require) {
  "use strict";

  return function createFileMenu(playlist) {
    var savePlaylist = require("savePlaylist");
    var openPlaylist = require("openPlaylist");
    var menu = Ti.UI.createMenu();
    var fileMenu = menu.addItem("File");
    fileMenu.addItem("Add song to playlist", playlist.add);
    fileMenu.addItem("Open playlist", function() {openPlaylist(playlist)});
    fileMenu.addItem("Save playlist", function() {savePlaylist(playlist)});
    var controlsMenu = menu.addItem("Controls");
    controlsMenu.addItem("Play", playlist.play);
    controlsMenu.addItem("Next", playlist.next);
    controlsMenu.addItem("Previous", playlist.previous);
    Ti.UI.getCurrentWindow().setMenu(menu);
  }
});
