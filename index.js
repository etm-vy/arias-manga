const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const db = require('./database');

const mangaRouter = require('./routes/manga');

app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/manga', mangaRouter);

app.listen(8001, () => {
    console.log('Listening on port 8001');
});