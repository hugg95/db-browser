var ipc = require('ipc');

console.log(ipc.send('db-query', 'select `name` from mysql.proc where db = \'demo\' and `type` = \'PROCEDURE\''));
