define(function(require) {
  "use strict";

  return function createFileMenu(playlist) {
    var menu = Ti.UI.createMenu();
    addFileMenu(menu);
    addControlsMenu(menu);
    Ti.UI.getCurrentWindow().setMenu(menu);

    function addFileMenu(menu) {
      var fileMenu = menu.addItem("File");
      fileMenu.addItem("Add song to playlist", addSong);
      fileMenu.addItem("Open playlist", openPlaylist);
      fileMenu.addItem("Save playlist", savePlaylist);

      function addSong() {
        require("addSongToPlaylist")(playlist);
      }

      function openPlaylist() {
        require("openPlaylist")(playlist);
      }

      function savePlaylist() {
        require("savePlaylist")(playlist);
      }
    }

    function addControlsMenu(menu) {
      var controlsMenu = menu.addItem("Controls");
      controlsMenu.addItem("Play", playlist.play);
      controlsMenu.addItem("Next", playlist.playNext);
      controlsMenu.addItem("Previous", playlist.playPrevious);
    }
  }
});
