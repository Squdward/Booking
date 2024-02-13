import { IUser } from "../../@types/types";
import { Database } from "../database";
import { generateUser } from "../utils/generateUser";
import { TokenService } from "./token-service";

class UserService {
    static registration(data) {

        // Формируем данные 
        const body = {
            id: Database.get('users').length,
            name: data.name,
            email: data.email,
            password: data.password
        }

        // Добавляем пользователя в БД
        Database.add('users', body);

        // Генерируем пару токенов 
        const [accessToken, refreshToken] = TokenService.generate({id: body.id})
        
        // Добавляем токен в БД
        TokenService.save(body.id, refreshToken);

        // Получаем свежие данные о пользователе 
        const user = Database.findOne('users', user => user.email === body.email)

        // Возвращаем 
        return [user, accessToken, refreshToken]
    }

    // static login(id) {
    //     Database.findOne('users', )
    // }
}

export {UserService}