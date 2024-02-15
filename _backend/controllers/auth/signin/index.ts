import { COOKIES } from "../../../constant/cookies";
import { UserService } from "../../../service/user-service";
import { CustomError } from "../../../utils/errors";
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
    } catch (error) {
        setStatusCode(error.code);

        return {
            message: error.message,
        };
    }
};

export { SignIn };
