var app = require('app');
var ipc = require('ipc');
var conn = require('./conn');

var connection = null;

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

ipc.on('show-dbs', function(event, arg) {
    connection.query('show databases', function(err, rows) {
        event.sender.send('show-dbs-reply', rows);
    });
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
