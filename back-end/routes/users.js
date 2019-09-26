var express = require('express');
const bcrypt = require('bcrypt-nodejs');
const randToken = require('rand-token');

const db = require('../db');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    const { email, pass } = req.body;
    if ((!email) || (!pass)) {
        res.json({
            msg: 'invalidData'
        })
        return;
    }

    const checkUserQuery = `
    SELECT * from users 
    WHERE email = ?`

    db.query(checkUserQuery, email, (err, results) => {
        console.log(results)
        if (err) {
            throw err
        }
        console.log(results.length)
        if (!results.length) {
            console.log('oops')
            res.json({
                msg: 'wrongEmail'
            })
        } else if (bcrypt.compareSync(pass, results[0].pass)) {

            const token = randToken.uid(50)
            const updateUserTokenQuery = `
        UPDATE users
        SET token = ?
        WHERE email = ?`
            db.query(updateUserTokenQuery, [token, email], (err2) => {
                if (err2) {
                    throw err2
                }
            })

            res.json({
                msg: 'loggedIn',
                email: results[0].email,
                first: results[0].first,
                token
            })
        } else {
            res.json({
                msg: 'wrongPass'
            })
        }
    })

    // console.log(req.body)
    // res.json(req.body)
})

router.post('/signup', function (req, res, next) {
    const { first, last, email, pass } = req.body;
    if ((!first) || (!last) || (!email) || (!pass)) {
        res.json({
            msg: 'invalidData'
        })
        return;
    }

    const checkUserQuery = `SELECT * FROM users WHERE email = ?`
    db.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            throw err
        }
        if (results.length > 0) {
            res.json({
                msg: 'userExists'
            })
        } else {
            const insertUserQuery = `
        INSERT INTO users 
          (first, last, email, pass, token)
        VALUES (?, ?, ?, ?, ?)
        `
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(pass, salt);
            const token = randToken.uid(50)

            db.query(insertUserQuery, [first, last, email, hash, token], (err2) => {
                if (err2) {
                    throw err2
                }
                res.json({
                    msg: 'userAdded',
                    token,
                    email,
                    first
                })
            })
        }
    })
    // res.json(req.body);
});

module.exports = router;
