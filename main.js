var app = require('app');
var BrowserWindow = require('browser-window');
var dialog = require('dialog');

/**
 * build native application menu
 */
var buildapplicationMenu = function() {
    var Menu = require('menu');
    var topMenu = require('./native/menu').menu(browserWindow, app);
    var menu = Menu.buildFromTemplate(topMenu);
    Menu.setApplicationMenu(menu);
};

require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var browserWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('open-url', function() {
    console.log('open url');
});

// monitor of the database operation
require('./db/dbMonitor');

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    // Create the browser window.
    browserWindow = new BrowserWindow({width: 1366, height: 768});

    buildapplicationMenu();

    browserWindow.loadUrl('file://' + __dirname + '/index.html');

    //dialog.showMessageBox(window, {type: 'warning', title: 'hello', buttons: ['1', '2', '3']});

    // Emitted when the window is closed.
    browserWindow.on('closed', function() {
        browserWindow = null;
    });
});
