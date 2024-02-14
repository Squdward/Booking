import { COOKIES } from "../../constant/cookies";
import { TokenService } from "../../service/token-service";
import { CustomError } from "../../utils/errors";

const Refersh = (_, {getCookie, setCookie, setStatusCode}) => {
    try {
        // Проверяем есть ли токен
        const token = getCookie(COOKIES.REFRESH_TOKEN) as string;

        if(!token) {
            throw new CustomError('Token was not found', 401)
        }

        const {user, accessToken, refreshToken} = TokenService.refresh(token);

        setCookie(COOKIES.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            maxAge: COOKIES.REFRESH_TIME_LIVE,
            path: "/",
        })

        return {user, accessToken}

    } catch (error) {
            setStatusCode(error.code);

            return {
                message: error.message
            }
    }
}

export {Refersh}