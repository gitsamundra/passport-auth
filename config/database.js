const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.URI;

const connection = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  admin: Boolean,
  salt: String
});

const User = connection.model('user', UserSchema);

module.exports = User;