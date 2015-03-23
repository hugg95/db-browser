var ipc = require('ipc');

console.log(ipc.send('db-query', 'select * from human'));
