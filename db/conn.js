var mysql = require('mysql');

// define connection instance, default is undefined
var conn;

exports.create = function(config) {
    conn = mysql.createConnection(config);
    return conn;
};

exports.connect = function(fn) {
    if (conn.connect) {
        if (typeof fn === 'function') {
            conn.connect(fn);
        } else {
            conn.connect();
        }
    }
};

