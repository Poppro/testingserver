var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');



router.post('/', function(req, res) {
    var path = req.flash('lastPath');
    fs.readdir(path[0], function(err, files) {
        req.flash('lastPath', path);

        req.flash('currentFile', files[req.body.fileSel]);

        res.send({redirect: '/'});
    });
});

module.exports = router;
