define(function(require) {
  "use strict";

  return function(playlist) {
    Ti.UI.getCurrentWindow().openSaveAsDialog(saveLocationSelectedCallback);

    function saveLocationSelectedCallback(savePathArray) {
      if (savePathArray.length === 0) {
        return;
      }
      var savePath = savePathArray[0];
      var saveFile = Ti.Filesystem.getFile(savePath);
      var saveFileStream = saveFile.open(Ti.Filesystem.MODE_WRITE);
      var paths = playlist.exportPaths();
      for (var key in paths) {
        saveFileStream.writeLine(paths[key]);
      }
      saveFileStream.close();
    }
  }
});
