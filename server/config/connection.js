const mongoose = require('mongoose');

//'mongodb://127.0.0.1:27017/googlebooks
//mongodb://localhost/googlebooks

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
