const userModel = require("../../models/user-model");
const ApiError = require("../../utils/apiError");
const bcrypt = require('bcrypt');
const TokenService = require("../token-service");
const userDTO = require("./config");
const CartService = require("../cart-service");
const FavouriteService = require("../favorite-service");
const OrderService = require("../order-service");

class UserService {
    static async registration(email, password) {
        const candidate = await userModel.findOne({email});

        if(candidate) {
            throw ApiError.BadRequest('Email is already taken')
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await userModel.create({email, password: hashPassword});

        const userDto = userDTO(user)

        const { accesToken, refreshToken} = TokenService.generate(userDto.id)
        
        TokenService.save(userDto.id, refreshToken);

        CartService.createCart(userDto.id);
        FavouriteService.createFavourite(userDto.id);
        OrderService.initOrder(userDto.id)

        return {user: userDto, accesToken, refreshToken}
    }

    static async login(email, password) {
        const user = await userModel.findOne({email});
        
        if(!user) {
            throw ApiError.BadRequest('email or password is incorrect');
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if(!isCorrectPassword) {
            throw ApiError.BadRequest('email or password is incorrect');
        }

        const { accesToken, refreshToken} = TokenService.generate(user.id);

        TokenService.save(user.id, refreshToken);

        const userDto = userDTO(user)

        return {user: userDto, accesToken, refreshToken }
    }


    static async refresh(refreshToken) { 
        if(!refreshToken) {
            throw ApiError.UnauthorizedError('Invalid token')
        }
        const jwtData = await TokenService.validateRefreshToken(refreshToken) 
        const token = await TokenService.findToken(refreshToken)

        if(!jwtData || !token) {
            throw ApiError.UnauthorizedError('Invalid token')
        }

        const user = await userModel.findById({_id: jwtData.userId});

        const {accesToken, refreshToken: newRefreshToken } = TokenService.generate(user.id)

        await TokenService.save(user.id, newRefreshToken)

        const userDto = userDTO(user)

        return {user: userDto, accesToken, refreshToken: newRefreshToken}
    }

    static async logout(refreshToken) {
        const deletedToken = TokenService.removeToken(refreshToken);
        return deletedToken
    }

    static async get(id) {
        const user = await userModel.findById(id);

        if(!user) {
            throw ApiError.NotFound('User was not found');
        }

        return userDTO(user)
    }

    static async patch(id, body) {
        const user = await userModel.findByIdAndUpdate(id, body, {new: true});

        if(!user) {
            throw ApiError.NotFound('User was not found');
        }

        return userDTO(user)
    }
}


module.exports = UserService