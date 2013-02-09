define(function(require) {
  "use strict";

  return function(menu, playlist) {
    var controlsMenu = menu.addItem("Controls");
    controlsMenu.addItem("Play", playlist.play);
    controlsMenu.addItem("Next", playlist.playNext);
    controlsMenu.addItem("Previous", playlist.playPrevious);
  }
});
