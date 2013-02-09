define(function(require) {
  "use strict";

  return function(playlist) {
      Ti.UI.getCurrentWindow().openFileChooserDialog(fileSelectedCallback, {multiple: false, title: "Add music file to playlist", types: ["wav", "mp3"]})

      function fileSelectedCallback(filePathsArray) {
        if (filePathsArray.length === 0) {
          return;
        }
        var songPath = filePathsArray[0];
        playlist.addSongByPath(songPath);
      }
  }
});
