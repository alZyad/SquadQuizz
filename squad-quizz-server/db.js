const mysql = require('mysql2');
const {logger} = require("./util.js")
require('dotenv').config();



var db_config = {
host: process.env.DB_HOST,
port: process.env.DB_PORT,
user: process.env.USER,
password: process.env.DB_PASSWORD,
database: 'squadQuizz',
ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
}
};

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
        logger('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        logger('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });

    connection.query('SELECT * from player', (err, res, fields) => {
        logger(`[DB] player selection : ${err, res}`);
    })
}

handleDisconnect();