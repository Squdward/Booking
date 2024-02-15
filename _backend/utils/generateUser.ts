import { IUser } from "../../@types/types"
import { Database } from "../database";

export const generateUser = (id: number, data: IUser): IUser => {
    const body = {
        id: id,
        name: data.name,
        email: data.email,
        password: data.password
    }

    Database.add('users', body);

    console.log(Database.get('users'))

    return Database.findOne("users", (user) => user.email === body.email) as IUser
}