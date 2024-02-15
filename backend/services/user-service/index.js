const userModel = require("../../models/user-model");
const ApiError = require("../../utils/apiError");
const bcrypt = require('bcrypt');
const TokenService = require("../token-service");
const userDTO = require("./config");

class UserService {
    static async registration(email, password) {
        const candidate = await userModel.findOne({email});

        if(candidate) {
            throw ApiError.UnauthorizedError('Email is already taken')
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await userModel.create({email, password: hashPassword});

        const userDto = userDTO(user)

        const { accesToken, refreshToken} = TokenService.generate(userDto.id)
        
        TokenService.save(userDto.id, refreshToken);

        return {user: userDto, accesToken, refreshToken}
    }

    static async login(email, password) {
        const user = await userModel.findOne({email});
        
        if(!user) {
            throw ApiError.UnauthorizedError('email or password is incorrect');
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if(!isCorrectPassword) {
            throw ApiError.UnauthorizedError('email or password is incorrect');
        }

        const { accesToken, refreshToken} = TokenService.generate(user.id);

        TokenService.save(user.id, refreshToken);

        const userDto = userDTO(user)

        return {user: userDto, accesToken, refreshToken }

    }
}


module.exports = UserService