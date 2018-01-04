var express = require('express');
var router = express.Router();
var File = require('../models/file');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// display page
router.get('/result', function (req, res) {
    File.find({}, function (err, result) {
        if(err){
            console.log(err);
            res.redirect('/');
        } else {

            console.log(result);


            res.render('result', {result: result});
        }
    });
});




module.exports = router;
