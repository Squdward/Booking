import { IToken, IUser } from "../../@types/types";
import { ACCSES_SECRET_KEY, EXPIRES_TIME, REFRESH_SECRET_KEY } from "../constant";
import { Database } from "../database";
import jwt from "jsonwebtoken";

type payload = {
    id: IUser['id']
}
class TokenService { 
    static generate(payload: payload): [string, string] {
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

    static save(userId: IUser['id'], refreshToken: IToken['refreshToken']) {
        // Проверяем сущестует ли токен 
        const token = Database.findOne('refreshTokens', (token) => token.userId === userId )

        // Если токен уже существует значит мы заменяем его новым
        if(token) {
            Database.update('refreshTokens', token.userId, 'userId', {...token, refreshToken})

            console.log('after: save', Database.get('refreshTokens'))

            return
        } 

        // Если токена не существует добавляем его в БД
        Database.add('refreshTokens', {userId, refreshToken})
    }  
}

export {TokenService}