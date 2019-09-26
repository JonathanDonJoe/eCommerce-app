var express = require('express');
var router = express.Router();

const db = require('../db');

const multer = require('multer');
const upload = multer( { dest: './public/images/' });

router.post('*', upload.single('locationImage'), (req, res, next) => {
    console.log('req.body.token')
    console.log(req.body.token)
    const token = req.body.token
    const getUserIdQuery = `SELECT id FROM users WHERE token = ?`;
    db.query(getUserIdQuery, token, (err, results) => {
        console.log('index query')
        console.log(results)
        console.log(results[0].id)
        if (err) {
            throw err
        }
        if (results === 0) {
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
    // .then((res4) => {
    //     next()
    // })
})




/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


module.exports = router;
