/**
 * Created by Popinator on 8/7/2017.
 */
var express = require('express');
const session = require('express-session')
var router = express.Router();
var users = ['Poppro', 'Calebowns','Ansim'];
var passwords = ['remoteaccess', 'calebrowns', 'guest'];
var passport = require('passport');
var LocalStrategy = require('passport-local');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Poppro Access Portal'});
});

//passport middleware
passport.use(new LocalStrategy(
    function(username, password, done) {
        var user = {username: username, password:password};
        var userFound = false;
        var userPos;
            for(var i = 0; i < users.length; i++) {
                if (username.toLowerCase() === users[i].toLowerCase()) {
                    userFound = true;
                    userPos = i;
                }
            }
        if(!userFound) {
            return done(null,false, {message: 'unknown user'})
        }

        if(passwords[userPos] === password) {
            user = {username: users[userPos], password:password};
            return done(null, user);
        }
        return done(null, false);
    }
));

router.post('/', passport.authenticate('local', {successRedirect:"/", failureRedirect:"/login", failureFlash: true}), function(req, res) {

});

module.exports = router;