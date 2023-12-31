const mongoose = require('mongoose');
const url = 'mongodb://localhost/manga';

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to Database');
});

db.on('error', (error) => {
    console.error('Connection error: ', error);
});

module.exports = db;