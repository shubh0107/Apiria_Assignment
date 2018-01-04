var express = require('express');
var router = express.Router();
var multer = require('multer');
var xlsxtojson = require('xlsx-to-json');
var xlstojson = require('xls-to-json-lc');
var File = require('../models/file');



// Storage settings for multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploaded_files/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

// Upload setting for multer
var upload = multer({
    storage: storage,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');

router.post('/', function(req, res) {
    var exceltojson; //Initialization
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        //start convert process

        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: null,
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                }
                File.create(result, function (err, savedFile) {
                    if(err){
                        console.log(err);
                    } else {
                        console.log('Saved!');
                        res.redirect('/result');
                    }
                });
            });

        } catch (e){
            res.json({error_code:1,err_desc:"Corrupted excel file"});
        }
    });
});



module.exports = router;











