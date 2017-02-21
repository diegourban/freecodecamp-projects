module.exports = function(uri) {
  var mongoose = require('mongoose');

  mongoose.connect('mongodb://' + uri);

  mongoose.connection.on('connected', function() {
    console.log('Connected to database');
  });

  mongoose.connection.on('error', function(error) {
    console.log('Failed to connect to database: ' + error);
  });

  mongoose.connection.on('disconnected', function() {
    console.log('Disconnected from database');
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Connection closed from the end of process');
      process.exit(0);
    });
  });
}
