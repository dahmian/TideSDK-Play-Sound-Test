define(function(require) {
  "use strict";

  return function(playlist) {
    Ti.UI.getCurrentWindow().openFileChooserDialog(fileSelectedCallback, {multiple: false, title: "Open playlist"});

    function fileSelectedCallback(filePathsArray) {
      debugger;
      if (filePathsArray.length === 0) {
        return;
      }
      playlist.stop();
      var path = filePathsArray[0];
      var fileStream = Ti.Filesystem.getFileStream(path);
      fileStream.open();
      var line;
      var pathArray = [];
      while(fileStream.ready()){
        var line = fileStream.readLine()
        if (line !== null) {
          var songPath = line.toString();
        }
        pathArray.push(songPath);
      }
      fileStream.close();
      playlist.importSongPaths(pathArray);
    }
  }
});
