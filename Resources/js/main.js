require(["menu/create", "playlist/create", "attachEventHandlers"], function() {
  requirejs.config({baseUrl: "js"});

  var playlistObject = require("playlist/create");
  var playlist = new playlistObject();

  require("menu/create")(playlist);
  require("attachEventHandlers")(playlist);

});
