const UserController = require('../controllers/user-controller');
const {body} = require('express-validator');
const AuthMiddleware = require('../middlwares/authMiddleware');
const BookController = require('../controllers/book-controller');
const ValidatorMiddleware = require('../middlwares/validatorMiddleware');
const Router = require('express').Router;
const validationBookRules = require("../validationRules/book");
const ValidationAuthorRules = require('../validationRules/author');
const AuthorController = require('../controllers/author-contoller');
// const validationBookRules = require("../validationRules/author")
const router = new Router();

// Auth Block
router.post('/signup', body('email', 'Invalid Email').isEmail(), body('password', 'Invalid Password').isLength({min: 5, max: 15}), UserController.registration)
router.post('/signin', body('email', 'Invalid Email').isEmail(), body('password').isLength({min: 5}), UserController.login)
router.get('/refresh', UserController.refresh)
router.get('/logout', UserController.logout)

// Author
router.post('/author', AuthMiddleware, ValidationAuthorRules.createAuthor(), ValidatorMiddleware, AuthorController.createAuthor)

// Book
router.post('/books', AuthMiddleware, validationBookRules.createBook(), ValidatorMiddleware, BookController.createBook)



module.exports = router