define(function(require) {
  "use strict";

  return function(playlist) {
    var menu = Ti.UI.createMenu();
    require("menu/file")(menu, playlist);
    require("menu/controls")(menu, playlist);
    Ti.UI.getCurrentWindow().setMenu(menu);
  }
});
