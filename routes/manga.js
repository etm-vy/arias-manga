const express = require('express');
const router = express.Router();
BookSchema = require('../models/manga');

function HandleError(response, reason, message, code){
    console.log("ERROR: " + reason);
    response.status(code || 500).json({"error": message});
}

router.get('/', (request, resonse) => {
    MangaSchema.find().exec((error, manga) => {
        if (error){
            HandleError(response, "error retrieving data", "get failed", 500);
        }else{
            response.send(manga);
        }
        });
});

router.post('/', (request, response) => {
    const mangaJSON = request.body;
    if (!mangaJSON.name || !mangaJSON.volume || !mangaJSON.author || !mangaJSON.year){
        HandleError(response, "missing information", "post data missing", 500);
    }else {
        manga = new MangaSchema({
            name: mangaJSON.name,
            volume: mangaJSON.volume,
            author: mangaJSON.author,
            year: mangaJSON.year
        });
        manga.save((error) => {
            if (error){
                response.send({"error": error});
            }else{
                response.send({"id": manga.id});
            }
        })
    }
    }
);
module.exports = router;