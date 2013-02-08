define(function(require) {
  "use strict";

  return function createFileMenu(playlist) {
    var menu = Ti.UI.createMenu();
    var fileMenu = menu.addItem("File");
    fileMenu.addItem("Add song to playlist", playlist.add);
    fileMenu.addItem("Open playlist", function() {openPlaylist(playlist)});
    fileMenu.addItem("Save playlist", playlist.save);
    var controlsMenu = menu.addItem("Controls");
    controlsMenu.addItem("Play", playlist.play);
    controlsMenu.addItem("Next", playlist.next);
    controlsMenu.addItem("Previous", playlist.previous);
    Ti.UI.getCurrentWindow().setMenu(menu);
  }

  function openPlaylist(playlist) {
    Ti.UI.getCurrentWindow().openFileChooserDialog(fileSelectedCallback, {multiple: false, title: "Open playlist"});

    function fileSelectedCallback(filePathsArray) {
      if (filePathsArray.length === 0) {
        return;
      }
      playlist.stop();
      var path = filePathsArray[0];
      var fileStream = Ti.Filesystem.getFileStream(path);
      fileStream.open();
      var line;
      var pathArray = [];
      while(line = fileStream.readLine().toString()) {
        pathArray.push(line);
      }
      fileStream.close();
      playlist.importSongPaths(pathArray);
    }
  }
});
