const TokenService = require("../../services/token-service");

// Мягка проверка на наличие аутентификации
const SoftAuthMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        
        if(!authorization) {
            return
        }

        const accesToken = authorization.split(" ")[1];

        if(!accesToken) {
            return
        }


        const tokenData = await TokenService.validateAccesToken(accesToken);

        if(!tokenData) {
            return 
        }

        req.user = tokenData

        next()
    } catch (error) {
        return next(error)
    }
}

module.exports = {SoftAuthMiddleware}