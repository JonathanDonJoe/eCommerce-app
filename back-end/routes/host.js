var express = require('express');
const db = require('../db');

const fs = require('fs');


var router = express.Router();


router.post('/homes', function(req, res, next) {
    // if (!res.locals.loggedIn) {
    //     res.json( {
    //         msg: 'badToken'
    //     })
    //     return;
    // }
    // console.log(req.body);
    // console.log(req.file);
    console.log('host locals')
    console.log(res.locals);
    const newFilePath = req.file.destination + '/' + Date.now() + req.file.originalname;
    console.log(newFilePath);
    const filePathForDb = newFilePath.slice(8);
    console.log(filePathForDb);
    fs.rename( req.file.path, newFilePath , (err) => {if(err) throw err});

    const { title, location, guests, pricePerNight, details, amenities } = req.body;
  
    // const getUserId = `SELECT id FROM users WHERE token = ?`;
    // db.query(getUserId, token, (err, results) => {
    //     if (err) {
    //         throw err
    //     }
    //     res.json
    // })

    const insertHomeQuery = `
        INSERT INTO homes
            (uid, title, location, guests, price_per_night, details, image_url, amenities)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const dbValues = [res.locals.uid, title, location, guests, pricePerNight, details, filePathForDb, amenities]
    db.query(insertHomeQuery, dbValues, (err) => {
        if (err) {
            throw err
        }
        res.json( {
            msg: 'homeAdded'
        })
    })

  })




module.exports = router;
