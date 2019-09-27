var express = require('express');
var router = express.Router();

const db = require('../db');

const multer = require('multer');
const upload = multer( { dest: './public/images/' });

router.post('*', upload.single('locationImage'), (req, res, next) => {
    console.log('index token')
    const token = req.body.token ? req.body.token : 1;
    console.log(token)
    const getUserIdQuery = `SELECT id FROM users WHERE token = ?`;


    db.query(getUserIdQuery, token, (err, results) => {
        console.log('index query')
        console.log(results)
        if (err) {
            throw err
        }
        if (!results || results.length === 0) {
            res.locals.loggedIn = false;
        } else {
            console.log('runs')
            res.locals.loggedIn = true;
            res.locals.uid = results[0].id
            console.log('res.locals.uid')
            console.log(res.locals.uid)
        }
        next();
    })

})

router.get('/abodes', (req, res, next) => {
    const abodesQuery = `
        SELECT * FROM homes
        ORDER BY RAND()
        LIMIT 9`
    db.query(abodesQuery, (err, results) => {
        if (err) {
            throw err
        }
        res.json(results);
    })
})

router.get('/abode/:abodeId', (req, res) => {
    const abodeId = req.params.abodeId;
    const getAbodeQuery = `SELECT * FROM homes where id = ?`

    db.query(getAbodeQuery, abodeId, (err, results) => {
        if (err) throw err;
        res.json(results[0])
    })

})



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


module.exports = router;
