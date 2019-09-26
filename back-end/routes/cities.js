var express = require('express');
const db = require('../db');

var router = express.Router();

router.get('/', (req, res, next) => {
    const citiesQuery = `
        SELECT * FROM cities
        ORDER BY RAND()
        LIMIT 9`
    db.query(citiesQuery, (err, results) => {
        if (err) {
            throw err
        }
        res.json(results);
    })
})




module.exports = router;
