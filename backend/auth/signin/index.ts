import { COOKIES } from "../../constant/cookies";
import { UserService } from "../../service/user-service";
import { CustomError } from "../../utils/errors";
import { isValidData } from "../config";

const SignIn = (_, { request, setStatusCode, setCookie }) => {
    try {
        const { email, password } = request.body;

        // Проверяем валидность данных
        if (!isValidData(email, password)) {
            throw new CustomError('Email or password is invalid', 401)
        }

        const {user, accessToken, refreshToken} = UserService.login(request.body);

        setCookie(COOKIES.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            expiresIn: COOKIES.REFRESH_TIME_LIVE,
            path: "/"
        })

        return {...user, accessToken}

        // ВЫНЕСТИ ЭТОТ БЛОК В СЕРВИС
        // ПРОВЕРИТЬ ФУНКЦИЮ ПО СОХРАНЕНИЮ ТОКЕНА (ТЕСТЫ ИЛИ РУЧНАЯЧ ПРОВЕРКА)

        // UserService.login(request.body, {setStatusCode})

        // // Проверяем есть ли пользовател с таким email и пароль?
        // const candidate = Database.findOne("users", (user) => user.email === email && user.password === password);

        // if (!candidate) {
        //     setStatusCode(401);

        //     return {
        //         message: "Incorrect login or password",
        //     };
        // }

        // setCookie(COOKIES.REFRESH_TOKEN, refreshToken, {
        //     httpOnly: true,
        //     expiresIn: COOKIES.REFRESH_TIME_LIVE,
        //     path: "/"
        // })
    } catch (error) {
        setStatusCode(error.code);

        return {
            message: error.message,
        };
    }
};

export { SignIn };
