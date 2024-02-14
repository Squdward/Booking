import { COOKIES } from "../../constant/cookies";
import { Database } from "../../database";
import { UserService } from "../../service/user-service";
import { CustomError } from "../../utils/errors";
import { isValidData } from "../config";

const SignUp = (_, {request, setStatusCode, setCookie}) => {
    try {
        const {email, password} = request.body

        // Проверяем валидность данных
        if(!isValidData(email, password)) {
            throw new CustomError("Email or password is invalid", 401)
        }
        
        // Создаем пользователя  
        const {user, accessToken, refreshToken} = UserService.registration(request.body)
        
        // Устанавливаем httpOnly куку
        setCookie(COOKIES.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            maxAge: COOKIES.REFRESH_TIME_LIVE,
            path: "/"
        })

        return {...user, accessToken}
    } catch (error) {
        setStatusCode(error.code);

        return {
            message: error.message
        }
    }
}

export {SignUp}