const mongoose = require('mongoose');

var uri = 'mongodb://abdure:abdure99@ds117849.mlab.com:17849/todoapp';

mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MongoDB_URI || 'mongodb://localhost:27017/TodoApp');
mongoose.connect(uri || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose};