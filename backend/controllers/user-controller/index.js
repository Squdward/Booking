const CartService = require("../../services/cart-service");
const FavouriteService = require("../../services/favorite-service");
const UserService = require("../../services/user-service");
const ApiError = require("../../utils/apiError");
const { REFRESH_COOKIE_NAME, REFRESH_COOKIE_MAX_AGE } = require("../../utils/constant/cookie");
const { validationResult } = require('express-validator');

class UserController {
    static async registration(request, response, next) {
        try {
            const errors = validationResult(request);
            if(!errors.isEmpty()) {
                throw ApiError.BadRequest('Body fields are invalid', errors.errors.map( i => i.msg))
            }
            const {email, password} = request.body;

            const userData = await UserService.registration(email, password);

            CartService.createCart(userData.user.id);
            FavouriteService.createFavourite(userData.user.id);
            
            response.cookie(REFRESH_COOKIE_NAME, userData.refreshToken, {maxAge: REFRESH_COOKIE_MAX_AGE, path: "/",  httpOnly: true} )
            
            return response.json(userData)
        } catch (error) {
            next(error)
        }
    }

    static async login(request, response, next) {
        try {
            const errors = validationResult(request);

            if(!errors.isEmpty()) {
                throw ApiError.BadRequest('Body fields are invalid', errors.errors.map( i => i.msg))
            }

            const {email, password} = request.body;

            const userData = await UserService.login(email, password);

            response.cookie(REFRESH_COOKIE_NAME, userData.refreshToken, {maxAge: REFRESH_COOKIE_MAX_AGE, path: "/",  httpOnly: true} )

            return  response.json(userData)
        } catch (error) {
            next(error)
        }
    }

    static async refresh(request, response, next) {
        try {
            const cookie = request.cookies;
            const {user, accesToken, refreshToken} = await UserService.refresh(cookie[REFRESH_COOKIE_NAME])

            response.cookie(REFRESH_COOKIE_NAME, refreshToken, {maxAge: REFRESH_COOKIE_MAX_AGE, path: "/",  httpOnly: true} )

            return response.json({user, accesToken})
        } catch (error) {
            next(error)
        }
    }

    static async logout(request, response, next) {
        try {
            const cookie = request.cookies;
            
            const deletedToken = await UserService.logout(cookie[REFRESH_COOKIE_NAME], {path: "/", httpOnly: true});
            
            response.clearCookie(REFRESH_COOKIE_NAME, {path: "/",  httpOnly: true});

            return response.json({deletedToken})
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController