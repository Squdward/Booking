import { RequestConfig } from "../../../../types/api";
import { IUser } from "../../../../types/user";
import { api } from "../../instanse";

const endpoint = 'user';

class UserRequest {
    static async patch(body: Partial<IUser>):RequestConfig<IUser> {
        return await api.patch(`${endpoint}`, body)    
    }

    static async get():RequestConfig<IUser> {
        return await api.get(`${endpoint}`);
    }
}

export {UserRequest}