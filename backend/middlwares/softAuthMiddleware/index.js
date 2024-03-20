const TokenService = require("../../services/token-service");
const ApiError = require("../../utils/apiError");

// Мягка проверка на наличие аутентификации
const SoftAuthMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        
        if(!authorization) {
            return next()
        }

        const accesToken = authorization.split(" ")[1];

        if(!accesToken) {
            return next()
        }


        const tokenData = await TokenService.validateAccesToken(accesToken);

        // Возвращаем 401 потому что вероятнее всего токен протух и нам необходимо его обновить
        if(!tokenData) {
            throw ApiError.UnauthorizedError('Token is invalid')
        }

        req.user = tokenData

        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = {SoftAuthMiddleware}