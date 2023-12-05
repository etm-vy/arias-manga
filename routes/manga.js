const express = require('express');
const router = express.Router();
MangaSchema = require('../models/manga');

function HandleError(response, reason, message, code){
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
}

router.get('/', (request, response) => {
    MangaSchema
    .find({})
    .then( (manga) => {
        response.status(200).json(manga);
    })
    .catch( (error) => {
        console.log(error);
        HandleError(response, error.message, "Failed to get manga");
        });
});

router.post('/', (request, response, next) => {
    const mangaJSON = request.body;
    if (!mangaJSON.title || !mangaJSON.volume || !mangaJSON.author || !mangaJSON.year){
        HandleError(response, "missing information", "post data missing", 500);
    }else {
      MangaSchema
      .create(mangaJSON)
      .then( (data) => {
          response.status(200).json(data);
      })
      .catch( (error) => {
          response.status(500).json(error);
      });
    };
    }
);
module.exports = router;