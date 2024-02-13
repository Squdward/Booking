import { COOKIES } from "../../constant/cookies";
import { Database } from "../../database";
import { generatePairOfTokens } from "../../utils/generateTokens";
import { generateUser } from "../../utils/generateUser";
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

    // Делаем запись в базу данных 
    const user = generateUser(Database.get('users').length, request.body);
    
    // Генерируем токен
    const [accessToken, refreshToken] = generatePairOfTokens({id: user.id});
    
    // Устанавливаем httpOnly куку
    setCookie(COOKIES.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        maxAge: COOKIES.REFRESH_TIME_LIVE,
        path: "/"
    })

    return {...user, accessToken}
}

export {SignUp}