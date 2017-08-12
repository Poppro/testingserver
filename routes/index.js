var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    var filesa = [];
    var temp = req.flash('currentFile');
    var path = req.flash('lastPath');

    if(path != '' && temp.length > 0) {
        path = path + '/' + temp[0];
    } else {
        path = './private';
    }
    req.flash('lastPath', path);

    if(path.slice(1).indexOf(".") > 0) {
        path = path.replace("private", "p")
        console.log(path.slice(1));
        res.redirect(path.slice(1));
        return;
    }
    fs.readdir(path, function(err, files) {
        var i = 0;
        files.forEach(function(file) {
            filesa[i] = file;
            i++;
        });
        if(req.user !== undefined) {
            res.render('index', {title: 'Poppro Home', filesToShow: filesa, user: req.user.username});
        } else {
            res.render('index', {title: 'Poppro Home', filesToShow: filesa, user: 'Poppro'});
        }
    });
});



module.exports = router;
