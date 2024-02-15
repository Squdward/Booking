import { IToken, IUser } from "../../@types/types";
import { ACCSES_SECRET_KEY, EXPIRES_TIME, REFRESH_SECRET_KEY } from "../constant";
import { Database } from "../database";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/errors";

type payload = {
    userId: IUser['id']
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

    static refresh(token: string) { 
        // Ищем такой токен в базе данных
       const tokenFromDB = Database.findOne('refreshTokens', ({ refreshToken}) => refreshToken === token);

        //Если токена нет, значит мы не можем обновить 
        if(!tokenFromDB) {
            throw new CustomError('Token was not found', 404)
        }

        // Декодируем пользователя
        const user = jwt.verify(
            token,
            REFRESH_SECRET_KEY,
            (err, decode: IToken) => {

                // Если при декодировании возникла ошибка
                // Значит токен не валидный
                if(err) {
                    throw new CustomError('Invalid token', 401)
                }
                
                console.log(Database.get('users'), decode)
                // Ищем пользователя при помощи ID с декодированного токена
                const candidate = Database.findOne('users', (user) => user.id === decode.userId)
               
                // Если такого пользователя не было найдено
                if(!candidate) {
                    throw new CustomError('User was not found', 404)
                }

                return candidate
            }
        )

        // Генерируем новую пару токенов 
        const [accessToken, refreshToken] = this.generate({id: user.id});
        
        // Сохраняем refresh в БД
        this.save(user.id, refreshToken);

        return {user, accessToken, refreshToken}
    }
}

export {TokenService}