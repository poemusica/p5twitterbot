// ==== REQUIRED MODULES ====
var page = require('webpage').create(),
	system = require('system');

// ==== SET UP PHANTOMJS ====
page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg);
};

page.clipRect = {
  top: 0,
  left: 0,
  width: 640,
  height: 360
};

// ==== RUN WEBPAGE IN PHANTOMJS ====
var filename = system.args[1];

page.open('./index.html', function(status) {
  console.log("Status: " + status);
  page.render(filename);
  phantom.exit();
});