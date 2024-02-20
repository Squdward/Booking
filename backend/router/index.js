const UserController = require('../controllers/user-controller');
const {body} = require('express-validator');
const AuthMiddleware = require('../middlwares/authMiddleware');
const BookController = require('../controllers/book-controller');
const ValidatorMiddleware = require('../middlwares/validatorMiddleware');
const validationBookRules = require('../controllers/book-controller/validationRules');
const Router = require('express').Router;

const router = new Router();

// Auth Block
router.post('/signup', body('email', 'Invalid Email').isEmail(), body('password', 'Invalid Password').isLength({min: 5, max: 15}), UserController.registration)
router.post('/signin', body('email', 'Invalid Email').isEmail(), body('password').isLength({min: 5}), UserController.login)
router.get('/refresh', UserController.refresh)
router.get('/logout', UserController.logout)

// Book
router.post('/books', AuthMiddleware, validationBookRules.createBook(), ValidatorMiddleware, BookController.createBook)



module.exports = router