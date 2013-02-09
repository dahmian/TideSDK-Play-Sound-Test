define(function(require) {
  "use strict";

  return function(menu, playlist) {
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
});
