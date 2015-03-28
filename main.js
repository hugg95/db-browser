var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var Menu = require('menu');
var dialog = require('dialog');

// native application menu
var topMenu = [{
    label: 'File',
    submenu: [{
        label: 'New connection',
        click: function() {
            window.webContents.send('call-new-conn');
        }
    },
    {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() {
            app.quit();
        }
    }]
}];

var menu = Menu.buildFromTemplate(topMenu);

require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var window = null;

var conn = require('./db/conn');

var connection = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('open-url', function() {
    console.log('open url');
});

ipc.on('db-connect', function(event, arg) {
    if (arg) {
        connection = conn.create(arg);
        connection.connect(function(err) {
            var response = null;
            if (err) {
                response = {err: err, stack: err.stack};
            }
            event.sender.send('db-connect-reply', response);
        });
    }
});

ipc.on('app-quit', function(event, arg) {
    app.quit();
});

ipc.on('db-query', function(event, arg) {
    //
});

ipc.on('show-error', function(event, arg) {
    dialog.showErrorBox('hello', 'dsdsdsdsdsdsdsds');
});

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    // Create the browser window.
    window = new BrowserWindow({width: 1366, height: 768});

    // and load the index.html of the app.
    window.loadUrl('file://' + __dirname + '/index.html');
    Menu.setApplicationMenu(menu);

    //dialog.showMessageBox(window, {type: 'warning', title: 'hello', buttons: ['1', '2', '3']});

    // Emitted when the window is closed.
    window.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        window = null;
    });
});
