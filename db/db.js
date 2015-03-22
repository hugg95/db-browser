var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lncwwn',
    database: 'demo'
});

connection.connect();

connection.query('select * from human', function(err, rows, fields) {
    if (err) throw err;

    console.log('result is: ', rows[0]);
});

connection.end();
