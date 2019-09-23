var express = require('express');
var router = express.Router();
var db = require('../db');
const bcrypt = require('bcrypt-nodejs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
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
      res.json( {
        msg: 'userExists'
      })
    } else {
      const insertUserQuery = `
      INSERT INTO users 
      (first, last, email, pass)
      VALUES (?, ?, ?, ?)
      `
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(pass, salt);

      db.query(insertUserQuery, [first, last, email, hash], (err2) => {
        if (err2) {
          throw err2
        }
        res.json( {
          msg: 'userAdded'
        })
      })
    }
  })
  // res.json(req.body);
});

module.exports = router;
