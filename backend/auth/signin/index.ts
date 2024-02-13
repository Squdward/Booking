import { REFRESH_SECRET_KEY } from "../../constant";
import { COOKIES } from "../../constant/cookies";
import { Database } from "../../database";
import { UserService } from "../../service/user-service";
import { isValidData } from "../config";

const SignIn = (_, { request, setStatusCode, setCookie }) => {
    const { email, password } = request.body;

    // Проверяем валидность данных
    if (!isValidData(email, password)) {
        setStatusCode(401);

        return {
            message: "Email or password is invalid",
        };
    }

    // ВЫНЕСТИ ЭТОТ БЛОК В СЕРВИС
    // ПРОВЕРИТЬ ФУНКЦИЮ ПО СОХРАНЕНИЮ ТОКЕНА (ТЕСТЫ ИЛИ РУЧНАЯЧ ПРОВЕРКА)
    
    // Проверяем есть ли пользовател с таким email и пароль?
    const candidate = Database.findOne("users", (user) => user.email === email && user.password === password);

    if (!candidate) {
        setStatusCode(401);

        return {
            message: "Incorrect login or password",
        };
    }

    const [user, accessToken, refreshToken] = UserService.login(request.body);

    setCookie(COOKIES.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        expiresIn: COOKIES.REFRESH_TIME_LIVE,
        path: "/"
    })

    return {user, accessToken}
};

export { SignIn };
