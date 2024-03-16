import { RequestConfig } from "../../../../types/api";
import { accesToken, loginType, refreshToken, registerType } from "../../../../types/auth";
import { IUserView } from "../../../../types/user";
import { api } from "../../instanse";


type AuthResponse = {
    user: IUserView;
    accesToken: accesToken;
    refreshToken: refreshToken;
};

const AuthController = {
    login: async (body: loginType): RequestConfig<AuthResponse> =>
        api.post("/signin", { ...body }),
    register: async (body: registerType): RequestConfig<AuthResponse> =>
        api.post("/signup", { ...body }),
};

export { AuthController };
