var express = require('express');
var router = express.Router();

const db = require('../db');

const multer = require('multer');
const upload = multer( { dest: './public/images/' });
const config = require('../config');
var stripe = require('stripe')(config.stripe)

router.post('*', upload.single('locationImage'), (req, res, next) => {
    // console.log('index token')
    const token = req.body.token
    // console.log(token)
    const getUserIdQuery = `SELECT id FROM users WHERE token = ?`;


    db.query(getUserIdQuery, [token], (err, results) => {
        // console.log('index query')
        // console.log(results)
        if (err) {
            throw err
        }
        if (!results || results.length === 0) {
            res.locals.loggedIn = false;
        } else {
            // console.log('runs')
            res.locals.loggedIn = true;
            res.locals.uid = results[0].id
            // console.log('res.locals.uid')
            // console.log(res.locals.uid)
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

router.post('/payment/stripe', (req, res) => {
    console.log(req.body);
    // res.json(req.body)
    if(!res.locals.loggedIn) {
        res.json({
            msg:'badToken'
        })
        return;
    }
    const { stripeToken, amount, email, abodeId } = req.body;
    stripe.charges.create({
        amount,
        currency: 'usd',
        source: stripeToken,
        description: `Charges for ${email}`
    }, (err, charge) => {
        if (err) {
            res.json({
                msg: 'errorProcessing'
            });
        } else {
            const insertReservationQuery = `
                INSERT INTO reservation 
                    (uid, hid, paid)
                VALUES
                    (?, ?, ?)`
            db.query( insertReservationQuery, [res.locals.uid, abodeId, 1]);
            res.json({
                msg:'paymentSuccess'
            })
        }
    })
})



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


module.exports = router;
