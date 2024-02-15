const userModel = require("../../models/user-model");
const ApiError = require("../../utils/apiError");
const bcrypt = require('bcrypt');
const TokenService = require("../token-service");

class UserService {
    static async registration(email, password) {
        const candidate = await userModel.findOne({email});

        if(candidate) {
            throw ApiError.UnauthorizedError('Email is already taken')
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await userModel.create({email, password: hashPassword});

        const userDto = {email: user.email, id: user.id};

        const { accesToken, refreshToken} = TokenService.generate(userDto.id)
        
        TokenService.save(userDto.id, refreshToken);

        return {user: userDto, accesToken, refreshToken}
    }
}


module.exports = UserService