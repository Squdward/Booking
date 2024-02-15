const UserController = require('../controllers/user-controller');
const {body} = require('express-validator');
const Router = require('express').Router;

const router = new Router();

// Auth Block
router.post('/signup', body('email', 'Invalid Email').isEmail(), body('password', 'Invalid Password').isLength({min: 5, max: 15}), UserController.registration)
router.post('/signin', UserController.login)
router.get('/refresh', UserController.refresh)
router.get('/logout', UserController.logout)



module.exports = router