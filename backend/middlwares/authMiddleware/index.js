const TokenService = require("../../services/token-service");
const ApiError = require("../../utils/apiError");

const AuthMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        
        if(!authorization) {
            throw ApiError.UnauthorizedError('Required token')
        }

        const accesToken = authorization.split(" ")[1];

        if(!accesToken) {
            throw ApiError.UnauthorizedError('Required token')
        }


        const tokenData = await TokenService.validateAccesToken(accesToken);

        if(!tokenData) {
            throw ApiError.UnauthorizedError('Token is invalid')
        }

        req.user = tokenData

        next()
    } catch (error) {
        return next(error)
    }
}


module.exports = AuthMiddleware