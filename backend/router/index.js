const UserController = require('../controllers/user-controller');
const {body} = require('express-validator');
const AuthMiddleware = require('../middlwares/authMiddleware');
const BookController = require('../controllers/book-controller');
const ValidatorMiddleware = require('../middlwares/validatorMiddleware');
const Router = require('express').Router;
const validationBookRules = require("../validationRules/book");
const ValidationAuthorRules = require('../validationRules/author');
const AuthorController = require('../controllers/author-contoller');
const GenreController = require('../controllers/genre-controller');
const ValidationGenreRules = require('../validationRules/genre');
const { uploadBookCover } = require('../utils/imageRoutes');
const CartController = require('../controllers/cart-controller');
const ValidationCartRules = require('../validationRules/cart');
const router = new Router();

// Auth Block
router.post('/signup', body('email', 'Invalid Email').isEmail(), body('password', 'Invalid Password').isLength({min: 5, max: 15}), UserController.registration)
router.post('/signin', body('email', 'Invalid Email').isEmail(), body('password').isLength({min: 5}), UserController.login)
router.get('/refresh', UserController.refresh)
router.get('/logout', UserController.logout)

// Author
router.post('/author', AuthMiddleware, ValidationAuthorRules.createAuthor(), ValidatorMiddleware, AuthorController.createAuthor)
router.get('/author', AuthMiddleware, AuthorController.getAuthors)

// Genre
router.post('/genre', AuthMiddleware, ValidationGenreRules.createGenre(), ValidatorMiddleware, GenreController.createGenre)
router.get('/genre', AuthMiddleware, GenreController.getAllGenres)

// Book
router.post('/book', AuthMiddleware, uploadBookCover.single('img'), validationBookRules.createBook(), ValidatorMiddleware, BookController.createBook)

router.get('/book', AuthMiddleware, BookController.getBooks) 
router.get('/book', BookController.getBooks)

router.post('/cart', AuthMiddleware, ValidationCartRules.AddToCart(), ValidatorMiddleware, CartController.addToCart)


module.exports = router