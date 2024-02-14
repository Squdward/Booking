import { IUser } from "../../@types/types";
import { Database } from "../database";
import { CustomError } from "../utils/errors";
import { generateUser } from "../utils/generateUser";
import { TokenService } from "./token-service";

type UserLogin = Pick<IUser, 'email' | 'password'>
type UserRegistration = Pick<IUser, 'email' | 'password' | "name">

class UserService {
    static registration(body: UserRegistration) {

        // Проверяем зантя ли Email?
        const candidate = Database.findOne('users',  (user) => user.email === body.email)

        if(candidate) {
            throw new CustomError('This email address is already taken', 401)
        }

        // Формируем данные 
        const userSchema = {
            id: Database.get('users').length,
            name: body.name,
            email: body.email,
            password: body.password
        }

        // Добавляем пользователя в БД 
        // Получаем свежие данные о пользователе 
        const user = Database.add('users', userSchema);
        
        // Генерируем пару токенов 
        const [accessToken, refreshToken] = TokenService.generate({id: user.id})
        
        // Добавляем токен в БД
        TokenService.save(user.id, refreshToken);

        // Возвращаем 
        return {user, accessToken, refreshToken}
    }

    static login(body: UserLogin) {
        // Проверяем есть ли пользовател с таким email и пароль?
        const user = Database.findOne("users", (user) => user.email === body.email && user.password === body.password);

        // Если пользователь существует выкидываем ошибку 
        if (!user) {
            throw new CustomError('Incorrect login or password', 401)
        }

        // Генерируеем парк токенов 
        const [accessToken, refreshToken] = TokenService.generate({id: user.id});

        // Сохраняем токен в БД
        TokenService.save(user.id, refreshToken);


        return {user, accessToken, refreshToken}
    }
}

export {UserService}