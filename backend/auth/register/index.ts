import { COOKIES } from "../../constant/cookies";
import { Database } from "../../database";
import { UserService } from "../../service/user-service";
import { isValidData } from "../config";

const SignUp = (_, {request, setStatusCode, setCookie}) => {
    const {email, password} = request.body

    // Проверяем валидность данных
    if(!isValidData(email, password)) {
        setStatusCode(401);

        return {
            message: "Email or password is invalid"
        }
    }

    // Проверяем зантя ли Email?
    const candidate = Database.findOne('users',  (user) => user.email === email)

    if(candidate) {
        setStatusCode(401);

        return {
            message: "This email address is already taken"
        }
    }

    // Создаем пользователя  
    const [user, accessToken, refreshToken] = UserService.registration(request.body)
    
    // Устанавливаем httpOnly куку
    setCookie(COOKIES.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        maxAge: COOKIES.REFRESH_TIME_LIVE,
        path: "/"
    })

    return {...user, accessToken}
}

export {SignUp}