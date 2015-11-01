import config from 'config';
import mongoose from 'mongoose';

let db_config = config.get('DB');
let db_uri    = db_config.get('URI');
let db        = mongoose.connect(db_uri);

// When successfully connected
db.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + db_uri);
});

// If the connection throws an error
db.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
db.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

module.exports = db;
