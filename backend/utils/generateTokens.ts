import { EXPIRES_TIME, ACCSES_SECRET_KEY, REFRESH_SECRET_KEY } from "../constant"
import jwt from "jsonwebtoken";

const generatePairOfTokens = (payload: any) => {
    const accessToken = jwt.sign(
        payload,
        ACCSES_SECRET_KEY, {
            expiresIn: EXPIRES_TIME.accessToken,
        }
    )

    const refreshToken = jwt.sign(
        payload,
        REFRESH_SECRET_KEY, {
            expiresIn: EXPIRES_TIME.refreshToken,
        }
    )


    return [accessToken, refreshToken]
}

export {generatePairOfTokens}