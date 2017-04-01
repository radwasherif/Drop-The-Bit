
let AuthController = require('../controllers/AuthController');
var express = require('express'),
	passport = require('passport'),
    router = express.Router();

var app = express();
router.get('/', AuthController.home);

router.get('/login', AuthController.getLogin);

router.post('/login', AuthController.postLogin);

router.get('/signup', AuthController.getSignup);

router.post('/signup', AuthController.postSignup);		

router.get('/profile', AuthController.getProfile);

router.get('/logout', AuthController.logout);	

router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

router.get('/auth/facebook/callback',passport.authenticate('facebook', {
            						successRedirect : '/profile',
            						failureRedirect : '/'
       							   }));


module.exports = router;        