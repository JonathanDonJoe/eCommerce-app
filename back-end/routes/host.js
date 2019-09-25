var express = require('express');
const db = require('../db');
const multer = require('multer');
const upload = multer( { dest: './public/images/' });
const fs = require('fs');


var router = express.Router();


router.post('/homes', upload.single('locationImage'), function(req, res, next) {
    console.log(req.body);
    console.log(req.file);

    fs.rename(req.file.path, req.file.destination + '/' + req.file.originalname, (err) => {if(err) throw err})

    res.json(req.body);
    const { title, location, guests, pricePerNight, details, image, amenities, token } = req.body;
  
  })




module.exports = router;
